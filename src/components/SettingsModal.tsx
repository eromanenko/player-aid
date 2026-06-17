"use client";

import { useTheme } from "next-themes";
import { useSettings } from "../contexts/SettingsContext";
import { X, Moon, Sun, Monitor, Languages, Check } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: string;
}

const locales = [
  { code: "uk", label: "Українська" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

const translations = {
  uk: {
    title: "Налаштування",
    language: "Мова",
    theme: "Тема оформлення",
    themeSystem: "Системна",
    themeLight: "Світла",
    themeDark: "Темна",
    filterMode: "Відображення ігор",
    filterAll: "Усі ігри",
    filterSelected: "Обрані",
    version: "Версія",
  },
  ru: {
    title: "Настройки",
    language: "Язык",
    theme: "Тема оформления",
    themeSystem: "Системная",
    themeLight: "Светлая",
    themeDark: "Темная",
    filterMode: "Отображение игр",
    filterAll: "Все игры",
    filterSelected: "Избранные",
    version: "Версия",
  },
  en: {
    title: "Settings",
    language: "Language",
    theme: "Theme",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    filterMode: "Games Display",
    filterAll: "All Games",
    filterSelected: "Selected",
    version: "Version",
  }
};

export function SettingsModal({ isOpen, onClose, currentLang }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();
  const { filterMode, setFilterMode } = useSettings();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent | React.PointerEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const switchLanguagePath = (newLang: string) => {
    if (!pathname) return `/${newLang}`;
    const pathWithoutLang = pathname.replace(`/${currentLang}`, "");
    return `/${newLang}${pathWithoutLang}`;
  };

  if (!isOpen) return null;

  const t = translations[currentLang as keyof typeof translations] || translations.en;

  const handleModeChange = (mode: 'all' | 'selected') => {
    setFilterMode(mode);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onPointerDown={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-card w-full max-w-md rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold">{t.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-6 overflow-y-auto max-h-[70vh]">
          
          {/* Filter Mode */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t.filterMode}</h3>
            <div className="bg-muted p-1 rounded-xl flex">
              <button
                onClick={() => handleModeChange('selected')}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all ${filterMode === 'selected' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {t.filterSelected}
              </button>
              <button
                onClick={() => handleModeChange('all')}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all ${filterMode === 'all' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {t.filterAll}
              </button>
            </div>
            {filterMode === 'selected' && (
              <p className="text-xs text-muted-foreground mt-1">
                {currentLang === 'uk' ? 'Щоб додати ігри сюди, переключіться в режим "Усі ігри" і відмітьте потрібні.' : currentLang === 'ru' ? 'Чтобы добавить игры сюда, переключитесь в режим "Все игры" и отметьте нужные.' : 'To add games here, switch to "All Games" mode and check the ones you want.'}
              </p>
            )}
          </div>

          {/* Theme */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t.theme}</h3>
            {mounted && (
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border ${theme === 'light' ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-muted-foreground/50'}`}
                >
                  <Sun className="w-5 h-5" />
                  <span className="text-xs font-medium">{t.themeLight}</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border ${theme === 'dark' ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-muted-foreground/50'}`}
                >
                  <Moon className="w-5 h-5" />
                  <span className="text-xs font-medium">{t.themeDark}</span>
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border ${theme === 'system' ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-muted-foreground/50'}`}
                >
                  <Monitor className="w-5 h-5" />
                  <span className="text-xs font-medium">{t.themeSystem}</span>
                </button>
              </div>
            )}
          </div>

          {/* Language */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Languages className="w-4 h-4" />
              {t.language}
            </h3>
            <div className="flex flex-col gap-2">
              {locales.map((loc) => (
                <Link
                  key={loc.code}
                  href={switchLanguagePath(loc.code)}
                  className={`flex items-center justify-between p-3 rounded-xl border ${currentLang === loc.code ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-muted-foreground/50'}`}
                  onClick={() => onClose()}
                >
                  <span className="font-medium">{loc.label}</span>
                  {currentLang === loc.code && <Check className="w-5 h-5" />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30 text-center">
          <span className="text-xs text-muted-foreground">{t.version} 0.4.2</span>
        </div>
      </div>
    </div>
  );
}
