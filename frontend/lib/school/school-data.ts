
//Needed to add a features of Announcement, Classwork so need things for it as well

import type { DirectoryRow } from "@/lib/types";
import { Item } from "radix-ui/accordion";

export type Assignment = {
    id: String;
    teacher: String;
    responsibility: "Class Teacher" | "Subject Teacher";
    session: string;
    classSection: string;
    subject: string;
};

export type LearningAssignment = {
    id: String;
    title: String;
    subject: String;
    classSection: string;
    dueDate: string;
    description: String;
};

export type StudentMark = {
    id: String;
    student: String;
    subject: String;
    classSection: string;
    assessment: string;
    score: number;
    status: "Draft" | "Submitted" | "Published";
};

export type Approval = {
  id: string;
  title: string;
  detail: string;
  status: "Pending" | "Approved" | "Returned";
};

export type SchoolData = {
  students: DirectoryRow[];
  staff: DirectoryRow[];
  assignments: Assignment[];
  learningAssignments: LearningAssignment[];
  marks: StudentMark[];
  reviewedAssignments: string[];
  attendance : Record<string, "Present" | "Absent" | "Late">;
  attendanceByDate?: Record<string, Record<string, "Present" | "Absent" | "Late">>;
  staffAttendanceByDate?: Record<string, Record<string, "Present" | "Absent" | "Late">>;
  approvals: Approval[];
  //need things to be added as said in first comment of this file
}; 

export const initialSchoolData: SchoolData = {
      approvals: [
    { id: "AP-01", title: "Year 10 mid-term results", detail: "Submitted by Priya Nair · 28 students", status: "Pending" },
    { id: "AP-02", title: "Sports Day announcement", detail: "For all students and families", status: "Pending" },
    { id: "AP-03", title: "Year 9 assessment schedule", detail: "Submitted by David Mensah", status: "Approved" },
  ],
  students: [
    { name: "Maya Sharma", id: "ST-2026-0842", detail: "Year 10 · 10-A", status: "Active" },
    { name: "Daniel Okafor", id: "ST-2026-0839", detail: "Year 10 · 10-A", status: "Active" },
    { name: "Amina Yusuf", id: "ST-2026-0788", detail: "Year 9 · 9-B", status: "Active" },
    { name: "Leo Martinez", id: "ST-2026-0771", detail: "Year 8 · 8-A", status: "Pending" },
    { name: "Rohan Sharma", id: "ST-2026-0744", detail: "Year 7 · 7-B", status: "Active" },
  ],
  staff: [
    { name: "Priya Nair", id: "T-014", detail: "Mathematics · Class Teacher 10-A", status: "Active" },
    { name: "David Mensah", id: "T-021", detail: "Science · Subject Teacher", status: "Active" },
    { name: "Mariam Bello", id: "T-008", detail: "Registrar", status: "Active" },
  ],
  assignments: [
    { id: "AS-01", teacher: "Priya Nair", responsibility: "Class Teacher", session: "2026/2027", classSection: "Year 10 · 10-A", subject: "—" },
    { id: "AS-02", teacher: "Priya Nair", responsibility: "Subject Teacher", session: "2026/2027", classSection: "Year 10 · 10-A", subject: "Mathematics" },
    { id: "AS-03", teacher: "Priya Nair", responsibility: "Subject Teacher", session: "2026/2027", classSection: "Year 9 · 9-B", subject: "Mathematics" },
  ],
  learningAssignments: [
    { id: "LA-01", title: "Algebra practice", subject: "Mathematics", classSection: "Year 10 · 10-A", dueDate: "Thursday, 5 November", description: "Complete questions 1–12 in your workbook." },
    { id: "LA-02", title: "Science assessment", subject: "Science", classSection: "Year 10 · 10-A", dueDate: "Friday, 6 November", description: "Review the revision notes before the assessment." },
    { id: "LA-03", title: "Fractions worksheet", subject: "Mathematics", classSection: "Year 7 · 7-B", dueDate: "Monday, 9 November", description: "Complete the assigned practice problems." },
  ],
  marks: [
    { id: "MK-01", student: "Maya Sharma", classSection: "Year 10 · 10-A", subject: "Mathematics", assessment: "Term 1 examination", score: 84, status: "Published" },
    { id: "MK-02", student: "Maya Sharma", classSection: "Year 10 · 10-A", subject: "Science", assessment: "Term 1 examination", score: 79, status: "Published" },
    { id: "MK-03", student: "Maya Sharma", classSection: "Year 10 · 10-A", subject: "English", assessment: "Term 1 examination", score: 88, status: "Published" },
    { id: "MK-04", student: "Rohan Sharma", classSection: "Year 7 · 7-B", subject: "Mathematics", assessment: "Term 1 examination", score: 81, status: "Published" },
    { id: "MK-05", student: "Amina Yusuf", classSection: "Year 9 · 9-B", subject: "Mathematics", assessment: "Term 1 examination", score: 76, status: "Submitted" },
  ],
  reviewedAssignments: [],
  attendance: {
    "ST-2026-0842": "Present",
    "ST-2026-0839": "Present",
    "ST-2026-0788": "Present",
    "ST-2026-0771": "Absent",
    "ST-2026-0744": "Present",
  },
 attendanceByDate: {
    "2026-10-29": {
      "ST-2026-0842": "Present",
      "ST-2026-0839": "Present",
      "ST-2026-0788": "Present",
      "ST-2026-0771": "Absent",
      "ST-2026-0744": "Present",
    },
  },
  staffAttendanceByDate: {
    "2026-10-29": {
      "T-014": "Present",
      "T-021": "Present",
      "T-008": "Present",
    },
  },

  //We need to add things here as well as per first 2 comments

};

export function updateApproval(data: SchoolData, id: string, status: "Approved" | "Returned"): SchoolData {
  const approval = data.approvals.find((item) => item.id === id);
  return {
    ...data,
    approvals: data.approvals.map((item) => item.id === id ? { ...item, status } : item),
    marks: approval?.title.toLowerCase().includes("result") && status === "Approved"
      ? data.marks.map((mark) => mark.status === "Submitted" ? { ...mark, status: "Published" } : mark)
      : data.marks,
  };
}

export function isSchoolData(value: unknown): value is SchoolData {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return ["students", "staff", "accounts", "assignments", "learningAssignments", "marks", "reviewedAssignments", "attendance"].every((key) => key in value)
    && Boolean(data.attendance && typeof data.attendance === "object");

}
