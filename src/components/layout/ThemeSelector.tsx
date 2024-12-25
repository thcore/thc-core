'use client'
import { themes, ThemeType } from '@/lib/themes';
import { useEffect, useState } from 'react';

// themes 객체의 첫 번째 키를 기본값으로 사용
const DEFAULT_THEME = Object.keys(themes)[0] as ThemeType;

export default function ThemeSelector() {
  const [theme, setTheme] = useState<ThemeType>(DEFAULT_THEME);

  useEffect(() => {
    const selectedTheme = themes[theme].colors;
    
    // CSS 변수 업데이트
    document.documentElement.style.setProperty('--background', selectedTheme.background);
    document.documentElement.style.setProperty('--foreground', selectedTheme.foreground);
    document.documentElement.style.setProperty('--card-background', selectedTheme.cardBackground);
    document.documentElement.style.setProperty('--border-color', selectedTheme.borderColor);
  }, [theme]);

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as ThemeType)}
      className="mb-4 px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--card-background)] text-[var(--foreground)]"
    >
      {Object.entries(themes).map(([key, value]) => (
        <option key={key} value={key}>
          {value.name}
        </option>
      ))}
    </select>
  );
}