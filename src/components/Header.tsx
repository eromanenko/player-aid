"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Languages } from "lucide-react";
import { useEffect, useState } from "react";

const locales = [
  { code: "uk", label: "UK" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export function Header({ currentLang, title }: { currentLang: string; title?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const switchLanguage = (newLang: string) => {
    if (!pathname) return `/${newLang}`;
    const pathWithoutLang = pathname.replace(`/${currentLang}`, "");
    return `/${newLang}${pathWithoutLang}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-4xl flex h-14 items-center justify-between px-4">
        <Link href={`/${currentLang}`} className="flex items-center space-x-2 truncate pr-4">
          <span className="font-bold text-xl tracking-tight text-primary truncate">
            {title || "Player Aid"}
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Languages className="h-4 w-4 text-muted-foreground" />
            {locales.map((loc) => (
              <Link
                key={loc.code}
                href={switchLanguage(loc.code)}
                className={`${
                  currentLang === loc.code ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {loc.label}
              </Link>
            ))}
          </div>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
