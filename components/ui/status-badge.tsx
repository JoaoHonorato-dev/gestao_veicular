import type { VehicleStatus } from "@/lib/dashboard-data";

type StatusBadgeProps = {
  status: VehicleStatus;
};

const config: Record<
  VehicleStatus,
  { label: string; dot: string; bg: string; text: string }
> = {
  online: {
    label: "Online",
    dot: "bg-emerald-500",
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  offline: {
    label: "Offline",
    dot: "bg-neutral-400",
    bg: "bg-neutral-500/10",
    text: "text-neutral-600 dark:text-neutral-400",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, dot, bg, text } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${bg} ${text}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden />
      {label}
    </span>
  );
}
