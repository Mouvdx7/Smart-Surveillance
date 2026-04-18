import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/useI18n";
import { AlertRow } from "@/components/AlertRow";
import { sampleAlerts } from "@/data/sample";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/alerts")({
  head: () => ({
    meta: [
      { title: "Alertes — Smart Surveillance" },
      { name: "description", content: "Historique de toutes les alertes détectées par vos caméras." },
    ],
  }),
  component: AlertsPage,
});

function groupByDay(alerts: typeof sampleAlerts) {
  const today: typeof sampleAlerts = [];
  const yesterday: typeof sampleAlerts = [];
  const older: typeof sampleAlerts = [];
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startYesterday = startToday - 86_400_000;
  for (const a of alerts) {
    const ts = new Date(a.at).getTime();
    if (ts >= startToday) today.push(a);
    else if (ts >= startYesterday) yesterday.push(a);
    else older.push(a);
  }
  return { today, yesterday, older };
}

function AlertsPage() {
  const { t } = useI18n();
  const groups = groupByDay(sampleAlerts);

  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-bold tracking-tight">{t("alerts")}</h1>

      {groups.today.length > 0 && (
        <Section title={t("today")} items={groups.today} />
      )}
      {groups.yesterday.length > 0 && (
        <Section title={t("yesterday")} items={groups.yesterday} />
      )}
      {groups.older.length > 0 && (
        <Section title="—" items={groups.older} />
      )}
    </div>
  );
}

function Section({ title, items }: { title: string; items: typeof sampleAlerts }) {
  return (
    <div className="mt-6">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-2">
        {items.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <AlertRow alert={a} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
