import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Camera, Shield, Activity, Monitor, Box, Maximize } from "lucide-react";
import { sampleCameras } from "@/data/sample";
import profilePic from "@/assets/profile.jpg";
import { useI18n } from "@/i18n/useI18n";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [
      { title: "Profil — Smart Surveillance" },
      { name: "description", content: "Statistiques et informations de votre compte." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { t, lang } = useI18n();

  const totalCameras = sampleCameras.length;
  const onlineCameras = sampleCameras.filter((c) => c.status === "online").length;
  const offlineCameras = sampleCameras.filter((c) => c.status === "offline").length;

  const indoorCount = sampleCameras.filter((c) => c.type === "Indoor").length;
  const outdoorCount = sampleCameras.filter((c) => c.type === "Outdoor").length;
  const ptzCount = sampleCameras.filter((c) => c.type === "PTZ").length;

  return (
    <div className="px-5 pt-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/app/settings"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-surface/40 text-foreground transition hover:bg-surface/60"
        >
          <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">{lang === "fr" ? "Mon Profil" : "ملفي الشخصي"}</h1>
      </div>

      {/* User Info */}
      <div className="mt-8 flex flex-col items-center text-center">
        <div className="relative">
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-primary/20 bg-surface shadow-xl">
            <img src={profilePic} alt="Mouad Anmirate" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground shadow-lg border-2 border-background">
            <Shield className="h-4 w-4" />
          </div>
        </div>
        <h2 className="mt-4 text-xl font-bold">Mouad Anmirate</h2>
        <p className="text-sm text-muted-foreground">mouadanmirate@gmail.com</p>
      </div>

      {/* Stats Summary */}
      <div className="mt-10">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {lang === "fr" ? "Vue d'ensemble des caméras" : "نظرة عامة على الكاميرات"}
        </h3>
        
        {totalCameras === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-surface/20 py-8 text-center text-muted-foreground">
            <Camera className="mb-2 h-8 w-8 opacity-20" />
            <p className="text-sm">{lang === "fr" ? "Aucune caméra disponible" : "لا توجد كاميرات متاحة"}</p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4">
            {/* Main Stats */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard 
                label={lang === "fr" ? "Total" : "الإجمالي"} 
                value={totalCameras} 
                icon={Camera} 
                color="text-primary" 
              />
              <StatCard 
                label={lang === "fr" ? "En ligne" : "متصل"} 
                value={onlineCameras} 
                icon={Activity} 
                color="text-success" 
                dot 
              />
              <StatCard 
                label={lang === "fr" ? "Hors ligne" : "غير متصل"} 
                value={offlineCameras} 
                icon={Activity} 
                color="text-destructive" 
                dot 
              />
            </div>

            {/* Type Breakdown */}
            <div className="mt-2 space-y-3">
              <h4 className="px-1 text-xs font-medium text-muted-foreground">
                {lang === "fr" ? "Répartition par type" : "التوزيع حسب النوع"}
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <TypeRow label="Indoor" count={indoorCount} icon={Monitor} />
                <TypeRow label="Outdoor" count={outdoorCount} icon={Box} />
                <TypeRow label="PTZ" count={ptzCount} icon={Maximize} />
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        © 2025 Smart Surveillance
      </p>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  color, 
  dot 
}: { 
  label: string; 
  value: number; 
  icon: any; 
  color: string; 
  dot?: boolean 
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-surface/40 p-4 transition-transform hover:scale-[1.02]">
      <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-opacity-20 ${color.replace('text-', 'bg-')}`}>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="flex items-center gap-1.5">
        {dot && <span className={`h-1.5 w-1.5 rounded-full ${color.replace('text-', 'bg-')}`} />}
        <span className="text-xl font-bold">{value}</span>
      </div>
      <span className="text-[10px] font-medium uppercase tracking-tight text-muted-foreground">{label}</span>
    </div>
  );
}

function TypeRow({ label, count, icon: Icon }: { label: string; count: number; icon: any }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/40 bg-surface/20 px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="text-sm font-bold text-primary">{count}</span>
    </div>
  );
}
