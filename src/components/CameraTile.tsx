import { motion } from "framer-motion";
import type { Camera } from "@/data/sample";
import { useI18n } from "@/i18n/useI18n";
import { Link } from "@tanstack/react-router";
import { Wifi, WifiOff } from "lucide-react";

export function CameraTile({ camera, index = 0 }: { camera: Camera; index?: number }) {
  const { lang, t } = useI18n();
  const online = camera.status === "online";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
    >
      <Link
        to="/app/live/$cameraId"
        params={{ cameraId: camera.id }}
        className="group relative block overflow-hidden rounded-2xl border border-border/60 glass shadow-[var(--shadow-elevated)] transition hover:border-primary/40"
      >
        <div className="relative aspect-video overflow-hidden bg-surface-2">
          <img
            src={camera.thumbnail}
            alt={camera.name[lang]}
            className="h-full w-full object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="scanline pointer-events-none absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

          {/* Status badge */}
          <div className="absolute top-3 start-3 flex items-center gap-1.5">
            {online ? (
              <span className="flex items-center gap-1.5 rounded-full bg-destructive/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-destructive-foreground" />
                {t("live")}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-muted/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <WifiOff className="h-3 w-3" />
                {t("offline")}
              </span>
            )}
          </div>

          {/* Name overlay */}
          <div className="absolute bottom-0 start-0 end-0 p-3">
            <h3 className="text-sm font-semibold text-foreground">{camera.name[lang]}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              {online && <Wifi className="h-3 w-3 text-success" />}
              {camera.location[lang]}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
