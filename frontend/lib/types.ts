export type Role = "Principal" | "Teacher" | "Student" | "Parent / Guardian" | "Admin";
export type AuthScreen = "code" | "credentials" | "register";
export type DirectoryRow = { name: string; id: string; detail: string; status: string };