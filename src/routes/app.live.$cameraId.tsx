import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as React from "react";
import {
  ChevronLeft,
  Mic,
  MicOff,
  Camera as CameraIcon,
  Circle,
  Maximize2,
  ChevronRight,
} from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { sampleCameras } from "@/data/sample";

export const Route = createFileRoute("/app/live/$cameraId")({
  loader: ({ params }) => {
    const cam = sampleCameras.find((c) => c.id === params.cameraId);
    if (!cam) throw notFound();
    return { camera: cam };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.camera.name.fr ?? "Caméra"} — Smart Surveillance` },
      { name: "description", content: "Vue en direct de votre caméra." },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="text-sm text-muted-foreground">Caméra introuvable</p>
      <Link to="/app" className="mt-4 text-sm font-semibold text-primary hover:underline">
        Retour
      </Link>
    </div>
  ),
  component: LiveView,
});

function LiveView() {
  const { camera } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const [muted, setMuted] = React.useState(true);
  const [recording, setRecording] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const others = sampleCameras.filter((c) => c.id !== camera.id);

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 pt-5 pb-3" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}>
        <Link
          to="/app"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/70 backdrop-blur"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
        </Link>
        <div className="text-center">
          <h1 className="text-sm font-bold">{camera.name[lang]}</h1>
          <p className="text-[11px] text-muted-foreground">{camera.location[lang]}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center">
          <span className="flex items-center gap-1.5 rounded-full bg-destructive/90 px-2 py-1 text-[10px] font-bold uppercase">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-destructive-foreground" />
            {t("live")}
          </span>
        </div>
      </header>

      {/* Video */}
      <div className="relative mx-3 flex-1 overflow-hidden rounded-3xl border border-border/60 bg-black">
        <video
          ref={videoRef}
          src={camera.streamUrl}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="scanline absolute inset-0" />

        {/* Overlay HUD */}
        <div className="pointer-events-none absolute top-3 start-3 rounded-md bg-background/60 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-success backdrop-blur">
          REC · 1080p · {new Date().toLocaleTimeString()}
        </div>
        <div className="pointer-events-none absolute top-3 end-3 rounded-md bg-background/60 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/80 backdrop-blur">
          CAM-{camera.id.split("-")[1]}
        </div>

        {/* PTZ-style controls (visual only) */}
        <div className="absolute bottom-3 start-3 grid grid-cols-3 gap-1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <button
              key={i}
              className="h-7 w-7 rounded-md bg-background/40 text-foreground/70 backdrop-blur transition hover:bg-primary/30 disabled:opacity-30"
              disabled={i === 4}
            >
              {i === 1 && "↑"}
              {i === 3 && "←"}
              {i === 5 && "→"}
              {i === 7 && "↓"}
            </button>
          ))}
        </div>

        <button
          className="absolute bottom-3 end-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/60 backdrop-blur transition hover:bg-primary/30"
          onClick={() => videoRef.current?.requestFullscreen?.()}
          aria-label={t("fullscreen")}
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* Action bar */}
      <div className="grid grid-cols-3 gap-2 px-3 py-4" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
        <ActionBtn
          icon={recording ? Circle : Circle}
          label={t("record")}
          active={recording}
          onClick={() => setRecording((v) => !v)}
        />
        <ActionBtn icon={CameraIcon} label={t("snapshot")} onClick={() => {}} />
        <ActionBtn
          icon={muted ? MicOff : Mic}
          label={muted ? t("mute") : t("talk")}
          active={!muted}
          onClick={() => setMuted((v) => !v)}
        />
      </div>

      {/* Switch camera */}
      <div className="border-t border-border/40 px-3 py-3" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {t("cameras")}
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground rtl:rotate-180" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {others.map((c) => (
            <Link
              key={c.id}
              to="/app/live/$cameraId"
              params={{ cameraId: c.id }}
              className="group relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-surface-2 transition hover:border-primary/50"
            >
              <img src={c.thumbnail} alt="" className="h-full w-full object-cover opacity-70 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-1.5">
                <p className="truncate text-[10px] font-semibold">{c.name[lang]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActionBtn({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-2xl border py-3 transition active:scale-[0.97] ${
        active
          ? "border-destructive/60 bg-destructive/15 text-destructive"
          : "border-border/60 bg-surface/50 text-foreground hover:border-primary/40"
      }`}
    >
      <Icon className={`h-5 w-5 ${active ? "fill-destructive" : ""}`} />
      <span className="text-[11px] font-semibold">{label}</span>
    </button>
  );
}
