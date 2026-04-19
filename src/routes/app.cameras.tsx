import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, QrCode, Globe, Trash2, X, Signal as SignalIcon, Clock, Monitor, Wifi, Edit2, RotateCw } from "lucide-react";
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
  const [selectedCameraId, setSelectedCameraId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (selectedCameraId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCameraId]);

  const selectedCamera = sampleCameras.find((c) => c.id === selectedCameraId);

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
            onClick={() => setSelectedCameraId(c.id)}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border/60 bg-surface/40 p-3 transition hover:border-primary/30 active:scale-[0.98]"
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
              onClick={(e) => {
                e.stopPropagation();
                // delete logic here
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-destructive/15 hover:text-destructive"
              aria-label={t("remove")}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedCamera && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCameraId(null)}
              className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70] flex flex-col bg-background"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img src={selectedCamera.thumbnail} alt="" className="h-full w-full object-cover" />
                <div className="scanline absolute inset-0" />
                
                {/* Top Overlay Controls */}
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
                  <div className="flex items-center gap-2 rounded-full bg-background/60 px-3 py-1.5 text-[10px] font-bold uppercase backdrop-blur-md">
                    <span className={`h-1.5 w-1.5 rounded-full ${selectedCamera.status === "online" ? "bg-success live-dot" : "bg-muted-foreground"}`} />
                    {selectedCamera.status === "online" ? t("online") : t("offline")}
                  </div>
                  <button
                    onClick={() => setSelectedCameraId(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-md transition hover:bg-background/80"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4">
                  <h2 className="text-xl font-bold tracking-tight text-white drop-shadow-md">{selectedCamera.name[lang]}</h2>
                  <p className="text-sm text-white/80 drop-shadow-md">{selectedCamera.location[lang]}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 pt-6 pb-20">
                <div className="grid grid-cols-2 gap-3">
                  <StatusItem icon={Monitor} label={t("type")} value={selectedCamera.type} />
                  <StatusItem icon={SignalIcon} label={t("signal")} value="94%" color="text-success" />
                  <StatusItem icon={Wifi} label={t("ipAddress")} value={`192.168.1.${10 + sampleCameras.indexOf(selectedCamera)}`} />
                  <StatusItem icon={Clock} label={t("uptime")} value="4d 12h" />
                </div>

                <div className="mt-8 flex gap-3">
                  <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-border/60 bg-surface/50 text-sm font-semibold transition hover:border-primary/40">
                    <Edit2 className="h-4 w-4" />
                    {lang === "fr" ? "Modifier" : "تعديل"}
                  </button>
                  <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-border/60 bg-surface/50 text-sm font-semibold transition hover:border-primary/40">
                    <RotateCw className="h-4 w-4" />
                    {t("reboot")}
                  </button>
                </div>

                <div className="mt-6 rounded-2xl border border-border/40 bg-surface/30 p-4">
                   <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Informations Système</p>
                   <div className="space-y-2">
                     <div className="flex justify-between text-xs">
                       <span className="text-muted-foreground">Firmware</span>
                       <span className="font-mono">v3.0.4-stable</span>
                     </div>
                     <div className="flex justify-between text-xs">
                       <span className="text-muted-foreground">MAC Address</span>
                       <span className="font-mono">00:1A:2B:3C:4D:5E</span>
                     </div>
                     <div className="flex justify-between text-xs">
                       <span className="text-muted-foreground">Encryption</span>
                       <span className="text-success font-semibold italic">AES-256 Bit</span>
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusItem({ icon: Icon, label, value, color = "text-foreground" }: { icon: any; label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-surface-2/30 p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2 text-muted-foreground">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className={`text-xs font-bold leading-tight ${color}`}>{value}</p>
      </div>
    </div>
  );
}

