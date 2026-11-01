"use client";

import { Button } from "@/components/ui/button";
import { useSchoolData } from "@/lib/school/school-data-provider";
import { MetricGrid, Panel, ScheduleList, WorkList } from "@/components/dashboards/dashboard-primitives";

export function TeacherOverview({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { data } = useSchoolData();
  const teachingAssignments = data.assignments.filter((item) => item.teacher === "Priya Nair");
  return <div className="role-dashboard">
    <MetricGrid onNavigate={onNavigate} metrics={[
      { label: "Classes today", value: "4", detail: "Across your assigned subjects", destination: "Timetable" },
      { label: "Attendance due", value: "1 register", detail: "Year 10 · 10-A", destination: "Attendance register" },
      { label: "Work to grade", value: "12", detail: "Across 2 assignments", destination: "Gradebook" },
      { label: "Next class", value: "10:30 am", detail: "Mathematics · Year 10-A", destination: "Timetable" },
    ]} />
    <div className="dashboard-grid">
      <Panel title="My timetable today" description="Thursday · 29 October" action="Full timetable" onAction={() => onNavigate("Timetable")}>
        <ScheduleList items={[["09:00", "Form · Year 10-A", "Room 14 · Complete"], ["10:30", "Mathematics · Year 10-A", "Room 14 · Next"], ["12:00", "Mathematics · Year 9-B", "Room 08 · Later"], ["14:00", "Science · Year 8-A", "Lab 02 · Later"]]} />
      </Panel>
      <Panel title="Teaching work" description="Tasks linked to your current assignments" action="Open gradebook" onAction={() => onNavigate("Gradebook")}>
        <WorkList onNavigate={onNavigate} items={[
          { title: "12 submissions need grading", detail: "Mathematics practice · Year 10", status: "Due soon", destination: "Gradebook" },
          { title: "Morning attendance is ready", detail: "Submit the Year 10-A register.", status: "Pending", destination: "Attendance register" },
          { title: "Assessment schedule", detail: "Year 9 mathematics · Friday", status: "Upcoming", destination: "Assessments" },
        ]} />
      </Panel>
    </div>
    <div className="dashboard-grid">
      <Panel title="My classes & subjects" description="Class and subject responsibilities together" action="Open class list" onAction={() => onNavigate("My classes & subjects")}>
        <WorkList onNavigate={onNavigate} items={teachingAssignments.map((item) => ({ title: item.subject === "—" ? item.classSection : `${item.subject} · ${item.classSection}`, detail: `${item.responsibility} · ${item.session}`, status: "Assigned", destination: "My classes & subjects" }))} />
      </Panel>
      <Panel title="School life" description="Information and updates for your classes">
        <WorkList onNavigate={onNavigate} items={[
          { title: "Read school circulars", detail: "Review current school notices.", status: "Open", destination: "Circulars" },
          { title: "Check the school diary", detail: "See dates that affect your classes.", status: "Open", destination: "School diary" },
          { title: "Open lesson plans", detail: "Review the sample lesson schedule.", status: "Open", destination: "Lesson plan" },
        ]} />
      </Panel>
    </div>
    <div className="quick-actions-card"><div className="quick-actions-grid">
      <Button onClick={() => onNavigate("Attendance register")}>Take attendance</Button>
      <Button variant="outline" onClick={() => onNavigate("Assignments")}>Create assignment</Button>
      <Button variant="outline" onClick={() => onNavigate("Gradebook")}>Grade student work</Button>
    </div></div>
  </div>;
}
