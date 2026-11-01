"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { useSchoolData } from "@/lib/school/school-data-provider";
import { AnnouncementText } from "@/components/shared/rich-text";
import type { Role } from "@/lib/types";

const diary = [
  ["31 Oct", "School Sports Day", "School grounds · wear your house colours"],
  ["05 Nov", "Mathematics homework due", "Year 10 · 10-A"],
  ["06 Nov", "Mathematics assessment", "Period 3 · Room 14"],
];

const libraryBooks = [
  { title: "The Young Scientist", author: "A. Bello", subject: "Science" },
  { title: "World History: A Student Guide", author: "M. Okafor", subject: "History" },
  { title: "Essential Mathematics, Book 2", author: "S. Nair", subject: "Mathematics" },
  { title: "Stories from Around the World", author: "L. Mensah", subject: "English" },
];

const serviceDetails: Record<string, { heading: string; description: string; entries: [string, string, string][] }> = {
  "Lesson plan": { heading: "Lessons for your classes", description: "Follow the topics scheduled for your current sample timetable.", entries: [["English", "Reading and comprehension", "Today · 09:00 · Room 12"], ["Mathematics", "Linear equations", "Today · 10:30 · Room 14"], ["Biology", "Cells and living systems", "Today · 12:00 · Lab 01"]] },
  "Exam details": { heading: "Upcoming assessments", description: "Check sample assessment dates and where to go.", entries: [["Mathematics", "Term assessment", "06 Nov · Period 3 · Room 14"], ["Science", "Revision quiz", "10 Nov · Period 2 · Lab 02"]] },
  "Online classes": { heading: "Online classes", description: "Join links are shared by your school when a class is scheduled.", entries: [["No online classes scheduled", "Your live class links will appear here.", "Ask your teacher if you expected a session"]] },
  "Online exam": { heading: "Online exams", description: "Online exam delivery is not configured in this demo.", entries: [["No online exam is open", "Your school has not published an online assessment here.", "Check Exam details for the sample schedule"]] },
  Activity: { heading: "School activities", description: "Activities and clubs shared with the student community.", entries: [["Sports Day", "Represent your house and take part in the school events.", "31 Oct · School grounds"], ["Science club", "Bring your observation notes to the next meeting.", "10 Nov · Science lab"]] },
  "Route details": { heading: "School transport", description: "Transport information is added by your school’s transport office.", entries: [["No route assigned", "There is no transport route linked to this demo student.", "Contact the school office to update transport details"]] },
  Birthday: { heading: "Birthdays", description: "Student birthdays are shown only when the school has added them.", entries: [["No birthdays to show", "There are no upcoming birthday records for this class.", "Check again later"]] },
  "My profile": { heading: "Student profile", description: "Review the sample identity details linked to your workspace.", entries: [["Student", "Maya Sharma", "ST-2026-0842"], ["Class", "Year 10 · 10-A", "Current academic session"], ["Profile changes", "Contact your school administrator", "Profile editing is not configured in this demo"]] },
};

function ParentRequestForm({ student }: { student: string }) {
  const { data, updateData } = useSchoolData();
  const [message, setMessage] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const topic = String(form.get("topic") ?? "");
    const body = String(form.get("message") ?? "").trim();
    if (!topic || !body) {
      setMessage("Choose a topic and describe what you need.");
      return;
    }
    updateData((current) => ({
      ...current,
      parentRequests: [{
        id: `REQ-${Date.now()}`,
        student,
        topic,
        message: body,
        status: "Received",
        postedAt: new Date().toLocaleDateString("en"),
      }, ...(current.parentRequests ?? [])],
    }));
    event.currentTarget.reset();
    setMessage("Request received in this browser’s demo workspace.");
  }

  return <section className="feature-page">
    <div className="prototype-notice"><strong>Contact your school</strong>Requests are saved in this browser only; they are not delivered to school staff.</div>
    <Card className="form-card"><form onSubmit={submit}><h2>Send a request about {student}</h2><div className="form-grid">
      <label>Request topic<NativeSelect name="topic" required><option value="">Choose a topic</option><option>Attendance correction</option><option>Student record update</option><option>Meeting request</option><option>Wellbeing support</option><option>Other</option></NativeSelect></label>
      <label className="form-field-wide">How can the school help?<Textarea name="message" rows={4} maxLength={1000} required placeholder="Include the details the school needs to review your request." /></label>
    </div><div className="form-actions"><span className="sample-caption">A real request channel requires a connected school account.</span><Button type="submit">Save request</Button></div></form></Card>
    {message && <p role="status" className={message.startsWith("Choose") ? "form-error" : "inline-success"}>{message}</p>}
    {(data.parentRequests ?? []).filter((request) => request.student === student).map((request) => <Card className="announcement-card" key={request.id}><div className="notice-header"><Badge variant="secondary">{request.status}</Badge><small>{request.postedAt}</small></div><h2>{request.topic}</h2><p>{request.message}</p></Card>)}
  </section>;
}

function FamilyRequestsInbox() {
  const { data, updateData } = useSchoolData();
  const requests = data.parentRequests ?? [];
  function markReviewed(id: string) {
    updateData((current) => ({
      ...current,
      parentRequests: (current.parentRequests ?? []).map((request) => request.id === id ? { ...request, status: "Reviewed" } : request),
    }));
  }
  return <section className="feature-page">
    <div className="prototype-notice"><strong>Family requests</strong>Requests are browser-local demo records and are not delivered to families or staff.</div>
    <div className="announcement-list">{requests.map((request) => <Card className="announcement-card" key={request.id}>
      <div className="notice-header"><Badge variant={request.status === "Reviewed" ? "default" : "warning"}>{request.status}</Badge><small>{request.postedAt}</small></div>
      <h2>{request.topic}</h2><p><strong>Student:</strong> {request.student}</p><p>{request.message}</p>
      {request.status === "Received" && <Button onClick={() => markReviewed(request.id)}>Mark reviewed</Button>}
    </Card>)}</div>
    {!requests.length && <Card className="empty-panel"><p>No family requests have been saved yet.</p></Card>}
  </section>;
}

export function SchoolServicesPage({ page, role, child = "Maya Sharma" }: { page: string; role: Role; child?: string }) {
  const { data } = useSchoolData();
  const [query, setQuery] = useState("");
  const details = serviceDetails[page];
  const student = role === "Parent / Guardian" ? child : "Maya Sharma";
  if (page === "Parent request") return <ParentRequestForm student={student} />;
  if (page === "Family requests") return <FamilyRequestsInbox />;

  if (page === "School diary" || page === "Holidays") {
    const entries = page === "Holidays" ? [["31 Oct", "School Sports Day", "School event · classes follow the published schedule"], ["25 Dec", "Christmas holiday", "School closed"]] : diary;
    return <section className="feature-page"><Card className="directory-card"><div className="feature-table-heading"><div><h2>{page === "Holidays" ? "School holidays and closures" : "School diary"}</h2><p>Dates and reminders for the student community.</p></div></div><div className="student-service-list">{entries.map(([date, title, detail]) => <div className="student-service-row" key={title}><Badge variant="secondary">{date}</Badge><div><strong>{title}</strong><p>{detail}</p></div></div>)}</div></Card></section>;
  }

  if (page === "Library") {
    const books = libraryBooks.filter((book) => `${book.title} ${book.author} ${book.subject}`.toLowerCase().includes(query.trim().toLowerCase()));
    return <section className="feature-page"><label className="search-field"><span className="sr-only">Search library</span><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search books by title, author or subject" /></label><div className="student-service-grid">{books.map((book) => <Card className="setting-card" key={book.title}><Badge variant="secondary">{book.subject}</Badge><strong>{book.title}</strong><small>{book.author} · Sample catalogue</small></Card>)}</div>{!books.length && <Card className="empty-panel"><p>No books match “{query}”. Try another title or subject.</p></Card>}</section>;
  }

  if (["Messages", "Circulars", "News"].includes(page)) {
    const classSection = role === "Parent / Guardian"
      ? child === "Rohan Sharma" ? "Year 7 · 7-B" : "Year 10 · 10-A"
      : role === "Teacher" ? "Year 10 · 10-A" : "";
    const matchingAnnouncements = data.announcements.filter((item) => {
      if (item.scope === "class") return Boolean(classSection) && item.classSection === classSection;
      if (role === "Teacher") return ["All families", "Teaching staff"].includes(item.audience);
      return ["All families", "All students", "Parents and guardians"].includes(item.audience);
    });
    return <section className="feature-page"><div className="announcement-list">{matchingAnnouncements.map((item) => <Card className="announcement-card" key={item.id}><div className="notice-header"><Badge variant="secondary">{item.scope === "class" ? item.classSection : item.audience}</Badge><small>{item.author ? `${item.author} · ` : ""}{item.postedAt}</small></div><h2>{item.title}</h2><AnnouncementText text={item.message} /></Card>)}</div>{!matchingAnnouncements.length && <Card className="empty-panel"><p>No {page.toLowerCase()} have been shared with your class.</p></Card>}</section>;
  }

  if (!details) return <Card className="empty-panel"><p>This student service is not available in the demo workspace.</p></Card>;
  return <section className="feature-page"><div className="prototype-notice"><strong>{page}</strong>Sample information only. Live links, exam delivery and profile changes require school configuration.</div><Card className="directory-card"><div className="feature-table-heading"><div><h2>{details.heading}</h2><p>{details.description}</p></div></div><div className="student-service-list">{details.entries.map(([title, detail, note]) => <div className="student-service-row" key={title}><div><strong>{title}</strong><p>{detail}</p></div><span>{note}</span></div>)}</div></Card></section>;
}
