'use client';

import { Code } from 'lucide-react';
import { useState } from 'react';

const tabs = [
  { id: 'react', label: 'Next.js / React' },
  { id: 'vue', label: 'Nuxt / Vue' },
  { id: 'svelte', label: 'SvelteKit' },
  { id: 'astro', label: 'Astro' },
  { id: 'shopify', label: 'Shopify' },
  { id: 'stripe', label: 'Stripe' }
];

const codeSamples: Record<string, string> = {
  react: `// lib/scalar.ts
import { createClient } from "@scalar/api-client";

export const scalar = createClient({
  projectId: process.env.SCALAR_PROJECT_ID,
  apiKey: process.env.SCALAR_API_KEY,
});`,

  vue: `// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@scalar/nuxt"],
});`,

  svelte: `// src/lib/scalar.ts
import { createClient } from "@scalar/api-client";

export const scalar = createClient({ ... });`,

  astro: `// astro.config.mjs
import scalar from "@scalar/astro";

export default {
  integrations: [scalar()],
};`,

  shopify: `// shopify-scalar.js
import { scalar } from "@scalar/shopify";

scalar.connect({ ... });`,

  stripe: `// stripe-scalar.ts
import { scalar } from "@scalar/stripe";

scalar.init({ ... });`
};

export default function Features() {
  const [active, setActive] = useState('react');

  return (
    <section className="container mx-auto py-12">
      {/* Header */}
      <div className="space-y-4 border-b pb-6">
        <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground md:text-base">
          <Code className="size-5" />
          Compatibility
        </h3>
        <h2 className="text-xl font-semibold md:text-2xl">
          Works out of the box with:
        </h2>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-col gap-6">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                active === tab.id
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div className="relative rounded-md border bg-card p-4">
          <pre className="overflow-x-auto text-sm">
            <code>{codeSamples[active]}</code>
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(codeSamples[active])}
            className="absolute right-4 top-4 rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground hover:bg-accent/80"
          >
            Copy
          </button>
        </div>
      </div>
    </section>
  );
}
