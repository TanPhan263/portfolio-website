import React from 'react';
import { Footer } from './footer';
import { Header } from './header';
import { HeroBackground } from './hero-background';

export const LayoutWithHeader = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="font-[family-name:var(--font-exo2)] font-medium w-screen">
      <HeroBackground>
        <Header />

        <main className="overflow-auto overflow-x-hidden container mx-auto flex-1 p-4">
          {children}
        </main>
        <Footer />
      </HeroBackground>
    </div>
  );
};
