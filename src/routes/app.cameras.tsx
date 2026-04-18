import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plus, QrCode, Globe, Trash2 } from "lucide-react";
import * as React from "react";
import { useI18n } from "@/i18n/useI18n";
import { sampleCameras } from "@/data/sample";

export const Route = createFileRoute("/app/cameras")({
  head: () => ({
    meta: [
      { title: "Caméras — Smart Surveillance" },
      { name: "description", content: "Ajoutez et gérez vos caméras de surveillance." },
    ],
  }),
  component: CamerasPage,
});

function CamerasPage() {
  const { t, lang } = useI18n();
  const [showAdd, setShowAdd] = React.useState(false);

  return (
    <div className="px-5 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("manageCameras")}</h1>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-95"
          aria-label={t("addCamera")}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {showAdd && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 grid grid-cols-2 gap-3"
        >
          <button className="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-surface/40 p-5 text-center transition hover:border-primary/40">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <QrCode className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold">{t("addByQR")}</span>
          </button>
          <button className="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-surface/40 p-5 text-center transition hover:border-primary/40">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Globe className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold">{t("addByIP")}</span>
          </button>
        </motion.div>
      )}

      <div className="mt-6 space-y-3">
        {sampleCameras.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface/40 p-3"
          >
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-2">
              <img src={c.thumbnail} alt="" className="h-full w-full object-cover opacity-80" />
              <div className="scanline absolute inset-0" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{c.name[lang]}</p>
              <p className="truncate text-xs text-muted-foreground">{c.location[lang]}</p>
              <span
                className={`mt-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                  c.status === "online" ? "text-success" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    c.status === "online" ? "bg-success live-dot" : "bg-muted-foreground"
                  }`}
                />
                {c.status === "online" ? t("online") : t("offline")}
              </span>
            </div>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-destructive/15 hover:text-destructive"
              aria-label={t("remove")}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
