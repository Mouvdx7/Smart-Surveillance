import { Link, useLocation } from "@tanstack/react-router";
import { Home, Video, Bell, Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/app" as const, key: "home" as const, icon: Home },
  { to: "/app/cameras" as const, key: "cameras" as const, icon: Video },
  { to: "/app/alerts" as const, key: "alerts" as const, icon: Bell },
  { to: "/app/settings" as const, key: "settings" as const, icon: SettingsIcon },
];

export function BottomTabs() {
  const { t } = useI18n();
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 glass"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-xl items-stretch justify-around px-2 py-2">
        {tabs.map(({ to, key, icon: Icon }) => {
          const active = pathname === to || (to !== "/app" && pathname.startsWith(to));
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  "relative flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 h-5 w-5" />
                <span className="relative z-10 text-[11px] font-medium">{t(key)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
