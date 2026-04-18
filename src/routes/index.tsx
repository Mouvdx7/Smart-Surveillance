import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, Bell, Eye, Smartphone, ArrowRight, Lock, Globe2 } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { LanguageToggle } from "@/components/LanguageToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Surveillance — Votre quartier, sous votre regard" },
      {
        name: "description",
        content:
          "Surveillez vos caméras à distance, recevez des alertes en temps réel et protégez votre quartier. Conçu pour tous, simple à installer.",
      },
      { property: "og:title", content: "Smart Surveillance — Votre quartier, sous votre regard" },
      {
        property: "og:description",
        content: "Vos caméras, partout avec vous. Conçu pour les quartiers locaux.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t, lang } = useI18n();

  const features = [
    { icon: Eye, title: lang === "fr" ? "Vue en direct" : "بث مباشر", desc: lang === "fr" ? "Vos caméras, où que vous soyez" : "كاميراتك أينما كنت" },
    { icon: Bell, title: lang === "fr" ? "Alertes instantanées" : "تنبيهات فورية", desc: lang === "fr" ? "Notification dès qu'un mouvement est détecté" : "إشعار فور رصد أي حركة" },
    { icon: Lock, title: lang === "fr" ? "100% chiffré" : "تشفير كامل", desc: lang === "fr" ? "Vos flux restent privés" : "بثوثك تبقى خاصة" },
    { icon: Smartphone, title: lang === "fr" ? "Simple à installer" : "تركيب بسيط", desc: lang === "fr" ? "Aucune compétence technique requise" : "بدون أي مهارة تقنية" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Glowing backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -end-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -start-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-sm font-bold tracking-tight">{t("appName")}</span>
        </div>
        <LanguageToggle />
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-5 pb-10 pt-12 text-center sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
        >
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-primary" />
          {lang === "fr" ? "Sécurité de quartier" : "أمن الحي"}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
        >
          {lang === "fr" ? (
            <>Votre quartier,<br /><span className="text-primary">sous votre regard.</span></>
          ) : (
            <>حيّك،<br /><span className="text-primary">تحت نظرك.</span></>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          {lang === "fr"
            ? "Surveillez vos caméras à distance, recevez des alertes en temps réel, et protégez ce qui compte. Sans configuration compliquée."
            : "راقب كاميراتك عن بُعد، استقبل التنبيهات لحظياً، واحمِ ما يهمّك. بدون إعدادات معقّدة."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/signup"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
          >
            {lang === "fr" ? "Commencer gratuitement" : "ابدأ مجاناً"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
          </Link>
          <Link
            to="/login"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border/60 bg-surface/40 px-7 text-sm font-semibold text-foreground transition hover:border-primary/40"
          >
            {t("login")}
          </Link>
        </motion.div>

        {/* Mock device */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mt-16 w-full max-w-sm"
        >
          <div className="relative rounded-[2.5rem] border border-border/60 bg-surface p-2 shadow-[var(--shadow-elevated)]">
            <div className="overflow-hidden rounded-[2rem] bg-background">
              <div className="relative aspect-[9/19] overflow-hidden">
                <img
                  src="https://picsum.photos/seed/cctv-hero/600/1200?grayscale&blur=1"
                  alt="Live camera preview"
                  className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <div className="scanline absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
                <div className="absolute top-6 start-6 flex items-center gap-2 rounded-full bg-destructive/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-destructive-foreground" />
                  {t("live")}
                </div>
                <div className="absolute bottom-6 start-6 end-6 rounded-2xl border border-border/40 bg-background/70 p-3 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/20 text-warning">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold">{t("motionDetected")}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {lang === "fr" ? "Entrée principale · à l'instant" : "المدخل الرئيسي · الآن"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-10 -bottom-8 h-16 rounded-[3rem] bg-primary/30 blur-2xl" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border/60 bg-surface/40 p-5 backdrop-blur"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold">{f.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 px-5 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p className="flex items-center gap-2">
            <Globe2 className="h-3.5 w-3.5" />
            {lang === "fr" ? "Disponible en français et en arabe" : "متوفر بالفرنسية والعربية"}
          </p>
          <p>© 2025 {t("appName")}</p>
        </div>
      </footer>
    </div>
  );
}
