import type { ReactNode } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type Metric = { label: string; value: string; detail: string; destination: string };
export type WorkItem = { title: string; detail: string; status: string; destination?: string };

export function MetricGrid({ metrics, onNavigate }: { metrics: Metric[]; onNavigate: (page: string) => void }) {
  return <div className="kpi-grid">{metrics.map((metric) => (
    <Button variant="ghost" className="metric-action kpi-card" key={metric.label} onClick={() => onNavigate(metric.destination)}>
      <span className="kpi-label">{metric.label}<ArrowRight /></span>
      <strong>{metric.value}</strong>
      <small>{metric.detail}</small>
    </Button>
  ))}</div>;
}

export function Panel({ title, description, action, onAction, children }: {
  title: string;
  description?: string;
  action?: string;
  onAction?: () => void;
  children: ReactNode;
}) {
  return <Card className="dashboard-panel">
    <CardHeader>
      <div><CardTitle>{title}</CardTitle>{description && <CardDescription>{description}</CardDescription>}</div>
      {action && onAction && <Button variant="outline" size="sm" onClick={onAction}>{action}</Button>}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>;
}

export function WorkList({ items, onNavigate }: { items: WorkItem[]; onNavigate: (page: string) => void }) {
  return <div className="priority-list">{items.map((item) => (
    <Button variant="ghost" className="priority-row priority-action" key={item.title} onClick={() => item.destination && onNavigate(item.destination)} disabled={!item.destination}>
      <span className="priority-indicator" />
      <span className="priority-copy"><b>{item.title}</b><small>{item.detail}</small></span>
      <Badge variant={item.status === "Due soon" || item.status === "Review" || item.status === "Pending" ? "destructive" : item.status === "Approved" || item.status === "Present" ? "default" : "secondary"}>{item.status}</Badge>
    </Button>
  ))}</div>;
}

export function AttendanceBars({ values }: { values: [string, number][] }) {
  return <div className="attendance-summary">{values.map(([name, value]) => (
    <div className="attendance-bar" key={name}><span>{name}</span><div><i style={{ width: `${value}%` }} /></div><b>{value}%</b></div>
  ))}</div>;
}

export function ScheduleList({ items }: { items: [string, string, string][] }) {
  return <div className="schedule-list">{items.map(([time, title, detail]) => (
    <div className="schedule-row" key={`${time}-${title}`}>
      <span className="schedule-time">{time}</span>
      <span className="schedule-copy"><b>{title}</b><small>{detail}</small></span>
      <CalendarDays aria-hidden="true" />
    </div>
  ))}</div>;
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className="dashboard-empty"><strong>{title}</strong><p>{detail}</p></div>;
}
