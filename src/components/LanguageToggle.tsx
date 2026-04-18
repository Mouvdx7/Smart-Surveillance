import { useI18n } from "@/i18n/useI18n";
import { Languages } from "lucide-react";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
      className={`inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur transition hover:border-primary/50 hover:text-primary ${className}`}
      aria-label="Toggle language"
    >
      <Languages className="h-3.5 w-3.5" />
      <span className="font-semibold">{lang === "fr" ? "العربية" : "Français"}</span>
    </button>
  );
}
