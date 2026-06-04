"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getSessionUser, setSessionUser } from "@/lib/auth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type LoginApiResponse = {
  success: boolean;
  message: string;
  data?: { id: number; name: string; email: string };
};

export default function LoginPage() {
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputSenha = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (getSessionUser()) {
      router.replace("/");
      return;
    }
    setCheckingSession(false);
  }, [router]);

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inputEmail.current?.value,
          password: inputSenha.current?.value,
        }),
      });
      const data: LoginApiResponse = await response.json();

      if (!data.success || !data.data) {
        setError(data.message);
        return;
      }

      setSessionUser({
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
      });
      router.push("/");
    } catch {
      setError("Não foi possível conectar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <LoadingSpinner size="lg" label="Verificando sessão..." />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-sky-950 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/80 p-8 shadow-2xl backdrop-blur"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500 text-lg font-bold text-white">
            GV
          </div>
          <h1 className="text-2xl font-semibold text-white">Acessar o sistema</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Rastreamento veicular
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
          >
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-neutral-300">
              E-mail
            </label>
            <input
              ref={inputEmail}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              type="email"
              name="email"
              id="email"
              placeholder="seu@email.com"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="senha" className="mb-1.5 block text-sm text-neutral-300">
              Senha
            </label>
            <input
              ref={inputSenha}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              type="password"
              name="senha"
              id="senha"
              placeholder="Sua senha"
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        <p className="mt-4 rounded-lg bg-neutral-800/60 px-3 py-2 text-xs text-neutral-400">
          Usuário de teste:{" "}
          <span className="font-mono text-neutral-300">teste_cursor@tete</span> /{" "}
          <span className="font-mono text-neutral-300">123</span>
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <LoadingSpinner size="sm" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </button>
      </form>
    </div>
  );
}
