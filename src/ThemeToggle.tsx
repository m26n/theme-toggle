import { ChangeEvent, useLayoutEffect, useState } from "react";

const themes = {
  light: "light",
  dark: "dark",
  red: "red",
  system: "system",
} as const;

type Theme = keyof typeof themes;

const htmlAttribute = "data-theme";
const localStorageKey = "theme";

function getDarkModeQuery() {
  return window.matchMedia("(prefers-color-scheme: dark)");
}

function resolveTheme(theme: Theme) {
  if (theme === "system") {
    return getDarkModeQuery().matches ? themes.dark : themes.light;
  }
  return theme;
}

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem(localStorageKey) as Theme) || "system";
  });

  useLayoutEffect(() => {
    const controller = new AbortController();

    function applyTheme() {
      const resolvedTheme = resolveTheme(theme);
      document.documentElement.setAttribute(htmlAttribute, resolvedTheme);
      localStorage.setItem(localStorageKey, theme);
    }

    applyTheme();

    const mediaQuery = getDarkModeQuery();

    function handleMediaQueryChange(_: MediaQueryListEvent) {
      if (theme === "system") {
        applyTheme();
      }
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [theme]);

  return [theme, setTheme] as const;
}

export function ThemeToggle() {
  const [theme, setTheme] = useTheme();

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value as Theme;
    setTheme(value);
  }

  return (
    <select
      name="theme"
      onChange={handleSelectChange}
      value={theme ?? themes.system}
      className="capitalize"
    >
      {Object.entries(themes).map(([key, value]) => (
        <option key={key} value={key} className="capitalize">
          {value}
        </option>
      ))}
    </select>
  );
}
