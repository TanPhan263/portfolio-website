'use client';

import { useSiteSettingStore } from '@/shared/stores/use-site-setting-store';
import { ThemeProvider, useTheme } from 'next-themes';
import { LayoutWithHeader } from '@/components/layout/layout-with-header';
import { useEffect } from 'react';

export function SiteWrapper({ children }: { children: React.ReactNode }) {
  const mode = useSiteSettingStore((s) => s.mode);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (mode === 'universe') {
      setTheme('dark');
    }
  }, [mode, setTheme]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      enableSystem={false}
    >
      {mode === 'universe' ? (
        <main className="relative min-h-screen flex flex-col">
          {children}
        </main>
      ) : (
        <LayoutWithHeader>{children}</LayoutWithHeader>
      )}
    </ThemeProvider>
  );
}
