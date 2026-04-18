import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plus, ShieldCheck, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { LanguageToggle } from "@/components/LanguageToggle";
import { CameraTile } from "@/components/CameraTile";
import { AlertRow } from "@/components/AlertRow";
import { sampleAlerts, sampleCameras } from "@/data/sample";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Accueil — Smart Surveillance" },
      { name: "description", content: "Tableau de bord avec aperçu en direct de vos caméras." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { t, lang } = useI18n();
  const onlineCount = sampleCameras.filter((c) => c.status === "online").length;
  const recentAlerts = sampleAlerts.slice(0, 3);

  return (
    <div className="px-5 pt-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t("goodEvening")}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">{t("appName")}</h1>
        </div>
        <LanguageToggle />
      </div>

      {/* Status card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-5 overflow-hidden rounded-2xl border border-success/30 bg-gradient-to-br from-success/10 via-surface/40 to-surface/40 p-5"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/20 text-success">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold">{t("allClear")}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {onlineCount} {lang === "fr" ? "caméras" : "كاميرات"} {t("activeNow")}
            </p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-success">{onlineCount}</span>
            <span className="text-sm text-muted-foreground">/{sampleCameras.length}</span>
          </div>
        </div>
      </motion.div>

      {/* Cameras */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-base font-semibold">{t("yourCameras")}</h2>
        <Link to="/app/cameras" className="text-xs font-semibold text-primary hover:underline">
          {t("seeAll")}
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {sampleCameras.map((c, i) => (
          <CameraTile key={c.id} camera={c} index={i} />
        ))}
        <Link
          to="/app/cameras"
          className="group flex aspect-video items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-surface/30 text-muted-foreground transition hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
        >
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Plus className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium">{t("addCamera")}</span>
          </div>
        </Link>
      </div>

      {/* Alerts */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-base font-semibold">{t("recentAlerts")}</h2>
        <Link
          to="/app/alerts"
          className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary hover:underline"
        >
          {t("seeAll")}
          <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </Link>
      </div>

      <div className="mt-3 space-y-2">
        {recentAlerts.map((a) => (
          <AlertRow key={a.id} alert={a} />
        ))}
      </div>
    </div>
  );
}
