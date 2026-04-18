import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import * as React from "react";
import { Shield, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { LanguageToggle } from "@/components/LanguageToggle";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Inscription — Smart Surveillance" },
      { name: "description", content: "Créez votre compte Smart Surveillance et sécurisez votre maison." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/app" });
  };

  return (
    <div className="relative flex min-h-screen flex-col px-5 py-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 start-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <header className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-sm font-bold">{t("appName")}</span>
        </Link>
        <LanguageToggle />
      </header>

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10"
      >
        <h1 className="text-3xl font-bold tracking-tight">{t("createAccountTitle")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("createAccountSub")}</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <Field icon={User} type="text" placeholder={t("fullName")} required autoComplete="name" />
          <Field icon={Mail} type="email" placeholder={t("email")} required autoComplete="email" />
          <Field icon={Phone} type="tel" placeholder={t("phone")} autoComplete="tel" />
          <Field icon={Lock} type="password" placeholder={t("password")} required autoComplete="new-password" />

          <button
            type="submit"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-[0.98]"
          >
            {t("signup")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          {t("haveAccount")}{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            {t("login")}
          </Link>
        </p>
      </motion.main>
    </div>
  );
}

function Field({
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        {...props}
        className="h-12 w-full rounded-2xl border border-border/60 bg-surface/60 ps-11 pe-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
