export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Sistema
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          Gestão de veículos
        </h1>
        <p className="mt-4 max-w-2xl text-neutral-600 dark:text-neutral-300">
          Base Next.js (App Router) com TypeScript, Tailwind CSS, Prisma e
          PostgreSQL. Estrutura preparada para evoluir módulos de frota,
          manutenção e telemetria.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-50">
            Pastas
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
            <li>
              <code className="rounded bg-neutral-100 px-1 py-0.5 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                app/
              </code>{" "}
              — rotas e layouts
            </li>
            <li>
              <code className="rounded bg-neutral-100 px-1 py-0.5 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                components/
              </code>{" "}
              — UI reutilizável
            </li>
            <li>
              <code className="rounded bg-neutral-100 px-1 py-0.5 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                lib/
              </code>{" "}
              — cliente Prisma, utilitários
            </li>
            <li>
              <code className="rounded bg-neutral-100 px-1 py-0.5 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                services/
              </code>{" "}
              — regras e persistência
            </li>
            <li>
              <code className="rounded bg-neutral-100 px-1 py-0.5 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                types/
              </code>{" "}
              — DTOs e tipos de domínio
            </li>
            <li>
              <code className="rounded bg-neutral-100 px-1 py-0.5 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                prisma/
              </code>{" "}
              — schema e migrações
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-50">
            Próximos passos
          </h2>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
            <li>Copie <span className="font-mono">.env.example</span> para{" "}
              <span className="font-mono">.env</span> e configure o PostgreSQL.
            </li>
            <li>
              Execute <span className="font-mono">npm install</span> e{" "}
              <span className="font-mono">npx prisma migrate dev</span> (ou{" "}
              <span className="font-mono">db push</span> em ambiente local).
            </li>
            <li>
              Rode <span className="font-mono">npm run dev</span> e comece as
              rotas em <span className="font-mono">app/</span>.
            </li>
          </ol>
        </article>
      </section>
    </div>
  );
}
