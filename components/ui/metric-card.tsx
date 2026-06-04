type MetricCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: string;
  accent?: "sky" | "emerald" | "amber" | "rose";
};

const accentStyles = {
  sky: "from-sky-500/10 to-sky-600/5 text-sky-600 dark:text-sky-400",
  emerald: "from-emerald-500/10 to-emerald-600/5 text-emerald-600 dark:text-emerald-400",
  amber: "from-amber-500/10 to-amber-600/5 text-amber-600 dark:text-amber-400",
  rose: "from-rose-500/10 to-rose-600/5 text-rose-600 dark:text-rose-400",
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  accent = "sky",
}: MetricCardProps) {
  return (
    <article
      className={`rounded-2xl border border-neutral-200/80 bg-gradient-to-br p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60 ${accentStyles[accent]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {subtitle}
            </p>
          )}
          {trend && (
            <p className="mt-2 text-xs font-medium text-neutral-600 dark:text-neutral-300">
              {trend}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm dark:bg-neutral-800/80">
            {icon}
          </div>
        )}
      </div>
    </article>
  );
}
