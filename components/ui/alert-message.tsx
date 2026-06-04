/**
 * Caixa de mensagem reutilizável (erro ou sucesso).
 */

type AlertMessageProps = {
  type: "error" | "success";
  message: string;
};

const styles = {
  error:
    "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
};

export function AlertMessage({ type, message }: AlertMessageProps) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className={`rounded-lg border px-3 py-2 text-sm ${styles[type]}`}
    >
      {message}
    </p>
  );
}
