"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScheduleList, WorkList } from "@/components/dashboards/dashboard-primitives";
import { useSchoolData } from "@/lib/school/school-data-provider";
import type { Role } from "@/lib/types";

export function AcademicPage({ page, role, onNavigate }: { page: string; role: Role; onNavigate: (page: string) => void }) {
  const { data } = useSchoolData();
  if (page === "Timetable" || page === "Timetable & classes" || page === "Calendar") {
    return <section className="feature-page"><Card className="directory-card"><CardHeader><div><CardTitle>{page === "Calendar" ? "School calendar" : "Thursday · 29 October"}</CardTitle><p className="feature-subtitle">Apex Royal College · 2026/2027 academic session · sample schedule</p></div></CardHeader><CardContent><ScheduleList items={[["09:00", "Form · Year 10-A", "Room 14 · Priya Nair"], ["10:30", "Mathematics · Year 10-A", "Room 14 · Priya Nair"], ["12:00", "Science · Year 9-B", "Lab 02 · David Mensah"], ["14:00", "Sports Day planning", "Main campus · School event"]]} /></CardContent></Card></section>;
  }
  if (page === "My classes & subjects" || page === "Class Teacher" || page === "Subject teaching" || page === "Teacher assignments") {
    return <section className="feature-page">

      <Card className="directory-card"><div className="feature-table-heading"><div><h2>{role === "Teacher" ? "Priya Nair’s teaching assignments" : "Teacher assignments"}</h2><p>Academic session · 2026/2027</p></div><span>{data.assignments.length} assignments</span></div>
        <div className="table-scroll"><Table className="data-table"><TableHeader><TableRow><TableHead>Teacher</TableHead><TableHead>Responsibility</TableHead><TableHead>Class / section</TableHead><TableHead>Subject</TableHead><TableHead>Session</TableHead></TableRow></TableHeader><TableBody>{data.assignments.map((item) => <TableRow key={item.id}><TableCell>{item.teacher}</TableCell><TableCell><Badge variant="secondary">{item.responsibility}</Badge></TableCell><TableCell>{item.classSection}</TableCell><TableCell>{item.subject}</TableCell><TableCell>{item.session}</TableCell></TableRow>)}</TableBody></Table></div>
      </Card>
      {role === "School Admin" && <div className="form-actions"><Button onClick={() => onNavigate("Create assignment")}>Create teacher assignment</Button></div>}
    </section>;
  }
  const detail = page === "Academics"
    ? [["Academic sessions", "2026/2027 · Current"], ["Terms", "Term 1 · Term 2 · Term 3"], ["Classes", "Year 7 through Year 12"], ["Campuses", "Main campus · North campus"]]
    : page === "Settings"
      ? [["School profile", "Apex Royal College"], ["Campus access", "Main campus · North campus"], ["Academic session", "2026/2027"], ["Prototype storage", "This browser only"]]
      : page === "Reports" || page === "Performance"
        ? [["Attendance summary", "94.2% · Current session"], ["Enrollment", `${837 + data.students.length} students`], ["Assessment average", "78.4% · Published assessments"], ["Fee balances", `${data.invoices.filter((invoice) => invoice.paid < invoice.amount).length} invoices outstanding`]]
        : page === "Staff allocations"
          ? data.staff.map((member) => [member.name, member.detail])
          : page === "Support"
            ? [["Open requests", "4 sample requests"], ["School setup help", "2 requests"], ["Account access", "1 request"], ["Billing question", "1 request"]]
            : page === "Contact school"
              ? [["Contact method", "Not configured"], ["School office", "Contact details are unavailable in this prototype"], ["For families", "Ask your school administrator"], ["For users", "Account and record help is handled by the school"]]
              : [["Current school session", "2026/2027"], ["Campus", "Main campus"], ["Updated", "Demo records"]];
  return <section className="feature-page">

    <div className="settings-grid">{detail.map(([label, value]) => <Card className="setting-card" key={label}><small>{label}</small><strong>{value}</strong></Card>)}</div>
    <Card className="directory-card"><div className="feature-table-heading"><div><h2>{page} overview</h2><p>Current sample school workspace</p></div></div><WorkList onNavigate={onNavigate} items={[
      { title: "Review current school records", detail: "Check the active academic session and campus scope.", status: "Current", destination: "Academics" },
      { title: "Open attendance oversight", detail: "Review the latest sample class registers.", status: "Available", destination: "Attendance" },
    ]} /></Card>
  </section>;
}
