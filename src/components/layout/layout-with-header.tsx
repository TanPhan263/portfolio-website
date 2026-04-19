import React from 'react';
import { Footer } from './footer';
import { Header } from './header';
import { HeroBackground } from './hero-background';

export const LayoutWithHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-(family-name:--font-exo2) font-medium w-screen">
      <HeroBackground>
        <Header />

        <main className="overflow-x-clip mx-auto flex-1 lg:p-4">{children}</main>
        <Footer />
      </HeroBackground>
    </div>
  );
};
