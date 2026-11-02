import { Activity, BookOpen, CalendarDays, CircleHelp, ClipboardCheck, ClipboardList, CreditCard, FileText, GraduationCap, LayoutDashboard, Megaphone, MoreHorizontal, ShieldCheck, Users, Wallet } from "lucide-react";
import type { Role } from "@/lib/types";

export const navMap: Record<Role, [string, [string, typeof LayoutDashboard][]][]> = {
  
  Teacher: [
    ["MY DAY", [["Overview", LayoutDashboard], ["Timetable", CalendarDays]]],
    ["TEACHING", [["My classes & subjects", BookOpen], ["Attendance register", ClipboardCheck], ["Assignments", FileText], ["Gradebook", Activity], ["Lesson plan", BookOpen], ["Exam details", ClipboardList], ["Online classes", Users], ["Online exam", ClipboardCheck]]],
    ["SCHOOL", [["Timetable", CalendarDays], ["Homework", FileText], ["Classwork", ClipboardList], ["Announcements", Megaphone], ["Messages", Megaphone], ["Circulars", ClipboardList], ["News", Activity], ["School diary", FileText], ["Holidays", CalendarDays], ["Activity", Activity], ["Library", BookOpen]]],
  ],

};

export const titleMap: Record<string, string> = {
  Overview: "Overview",
  "Accounts & Access": "Accounts & Access",
  "Teacher assignments": "Teacher assignments",
  "Attendance register": "Attendance register",
  "My classes & subjects": "My classes & subjects",
  "Timetable & classes": "Timetable & classes",
  "My profile": "My profile",
  "Audit & security": "Audit & security",
  "Gradebook": "Assessments and gradebook",
  "School diary": "School diary",
  Circulars: "Circulars",
  News: "School news",
  Holidays: "Holidays and closures",
  Activity: "School activities",
  Library: "Library",
  "Route details": "Transport information",
  Birthday: "Class birthdays",
  "Parent request": "Contact the school",
  "Lesson plan": "Lesson plans",
  "Exam details": "Examination schedule",
  "Online classes": "Online classes",
  "Online exam": "Online exams",
};

export const descriptions: Record<string, string> = {
  Overview: "A role-specific view of the school work and actions relevant to you.",
  Students: "Find and manage student records for the current school session.",
  "Accounts & Access": "School-created accounts and their roles.",
  Attendance: "Review school attendance for the selected day.",
  "Attendance register": "Record attendance for the classes you teach.",
  Academics: "Review the academic session, terms, classes, sections and subjects.",
  "My classes & subjects": "Your combined class-teacher and subject-teaching responsibilities.",
  "Timetable & classes": "Your enrolled classes, subjects and weekly timetable.",
  Timetable: "Your scheduled classes and school events.",
  Assignments: "Review learning tasks, submissions and due dates.",
  Gradebook: "Review assessment submissions and grading work for your assigned classes.",
  Support: "Review sample school support requests.",
  "Service health": "Review demonstration platform health checks.",
  "Audit & security": "Review platform-level sample audit events.",
  "Contact school": "Use the school’s configured contact channels.",
  "Family requests": "Review family requests saved in this browser’s demo workspace.",
};
