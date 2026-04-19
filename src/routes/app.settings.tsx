import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { ChevronRight, User, Bell, Globe2, Lock, Info, LogOut, ShieldCheck } from "lucide-react";
import profilePic from "@/assets/profile.jpg";
import { useI18n } from "@/i18n/useI18n";
import type { Lang } from "@/i18n/translations";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Réglages — Smart Surveillance" },
      { name: "description", content: "Préférences du compte, notifications et langue." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { t, lang, setLang } = useI18n();
  const [push, setPush] = React.useState(true);
  const [motion, setMotion] = React.useState(true);
  const [night, setNight] = React.useState(false);

  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-bold tracking-tight">{t("settings")}</h1>

      {/* Profile */}
      <Link
        to="/app/profile"
        className="mt-6 flex items-center gap-4 rounded-2xl border border-border/60 bg-surface/40 p-4 transition-all hover:bg-surface/60 active:scale-[0.98] cursor-pointer"
      >
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primary/20 text-primary">
          <img src={profilePic} alt="Mouad Anmirate" className="h-full w-full object-cover" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Mouad Anmirate</p>
          <p className="text-xs text-muted-foreground">mouadanmirate@gmail.com</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
      </Link>

      {/* Encryption status */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-success/30 bg-success/5 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/20 text-success">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">{t("encryption")}</p>
          <p className="text-xs text-muted-foreground">{t("encryptionOn")}</p>
        </div>
      </div>

      {/* Notifications */}
      <Section icon={Bell} title={t("notifications")}>
        <Toggle label={t("pushNotifications")} value={push} onChange={setPush} />
        <Toggle label={t("motionAlerts")} value={motion} onChange={setMotion} />
        <Toggle label={t("nightMode")} value={night} onChange={setNight} />
      </Section>

      {/* Language */}
      <Section icon={Globe2} title={t("language")}>
        <div className="grid grid-cols-2 gap-2 p-2">
          {(["fr", "ar"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                lang === l
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-2 text-foreground hover:bg-surface-2/80"
              }`}
            >
              {l === "fr" ? "Français" : "العربية"}
            </button>
          ))}
        </div>
      </Section>

      {/* Security & About */}
      <Section icon={Lock} title={t("security")}>
        <Row label={lang === "fr" ? "Changer le mot de passe" : "تغيير كلمة المرور"} />
        <Row label={lang === "fr" ? "Sessions actives" : "الجلسات النشطة"} />
      </Section>

      <Section icon={Info} title={t("about")}>
        <Row label={lang === "fr" ? "Version 1.0.0" : "النسخة 1.0.0"} />
        <Row label={lang === "fr" ? "Conditions d'utilisation" : "شروط الاستخدام"} />
      </Section>

      <Link
        to="/login"
        className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3.5 text-sm font-semibold text-destructive transition hover:bg-destructive/20"
      >
        <LogOut className="h-4 w-4" />
        {t("logout")}
      </Link>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        © 2025 Smart Surveillance
      </p>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center gap-2 px-1">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface/40 divide-y divide-border/40">
        {children}
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition ${value ? "bg-primary" : "bg-surface-2"}`}
        aria-pressed={value}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-all ${
            value ? "start-[1.375rem]" : "start-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function Row({ label }: { label: string }) {
  return (
    <button className="flex w-full items-center justify-between px-4 py-3.5 text-start transition hover:bg-surface-2/40">
      <span className="text-sm">{label}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
    </button>
  );
}
