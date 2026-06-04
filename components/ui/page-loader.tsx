import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function PageLoader({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <LoadingSpinner size="lg" label={label} />
    </div>
  );
}
