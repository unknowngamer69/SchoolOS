"use client";

import type { Role } from "@/lib/types";
import { TeacherOverview } from "@/components/dashboards/roles/teacher/overview";

export function WorkspaceOverview({ role, onNavigate, child }: {
  role: Role;
  onNavigate: (page: string) => void;
  child: string;
}) {
  switch (role) {
    case "Teacher": return <TeacherOverview onNavigate={onNavigate} />;
  }
}
