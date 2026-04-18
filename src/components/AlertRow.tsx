import type { Alert } from "@/data/sample";
import { sampleCameras } from "@/data/sample";
import { useI18n } from "@/i18n/useI18n";
import { Footprints, PersonStanding, Volume2, WifiOff } from "lucide-react";
import type { TranslationKey } from "@/i18n/translations";

const iconMap = {
  motion: Footprints,
  person: PersonStanding,
  sound: Volume2,
  offline: WifiOff,
} as const;

const labelMap: Record<Alert["type"], TranslationKey> = {
  motion: "motionDetected",
  person: "personDetected",
  sound: "soundDetected",
  offline: "cameraOffline",
};

const accentMap = {
  motion: "text-warning bg-warning/15",
  person: "text-primary bg-primary/15",
  sound: "text-success bg-success/15",
  offline: "text-destructive bg-destructive/15",
} as const;

function timeAgo(iso: string, t: (k: TranslationKey) => string) {
  const diffMin = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
  if (diffMin < 60) return `${diffMin} ${t("minutesAgo")}`;
  const h = Math.floor(diffMin / 60);
  if (h < 24) return `${h} ${t("hoursAgo")}`;
  const d = Math.floor(h / 24);
  return d === 1 ? t("yesterday") : `${d} ${t("today")}`;
}

export function AlertRow({ alert }: { alert: Alert }) {
  const { lang, t } = useI18n();
  const Icon = iconMap[alert.type];
  const camera = sampleCameras.find((c) => c.id === alert.cameraId);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-surface/40 p-3 transition hover:border-primary/30 hover:bg-surface/70">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accentMap[alert.type]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{t(labelMap[alert.type])}</p>
        <p className="truncate text-xs text-muted-foreground">{camera?.name[lang] ?? ""}</p>
      </div>
      <span className="shrink-0 text-xs font-medium text-muted-foreground">
        {timeAgo(alert.at, t)}
      </span>
    </div>
  );
}
