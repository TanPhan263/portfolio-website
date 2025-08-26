export default function Showcase() {
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 border border-t-0 md:grid-cols-2" />
      <div className="bordered-div-padding relative space-y-8 border-b md:border-e !pb-0">
        <canvas
          className="pointer-events-none absolute inset-0 -mt-0.25 hidden !h-[calc(100%+2px)] -translate-x-full border-y md:block"
          width="1668"
          height="540"
          style={{ width: '1668px', height: '540.094px' }}
        ></canvas>
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-4">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-layers size-5"
                aria-hidden="true"
              >
                <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
              </svg>
              Schema
              <br />
              Builder
            </h2>
            <h3 className="text-foreground font-weight-display leading-snug md:text-xl">
              Design content structures your way.
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
            Scalar CMS gives you full control over content with a streamlined,
            API-first experience — perfect for teams who want speed without
            sacrificing flexibility.
          </p>
        </div>
        <div className="flex flex-col gap-4 mask-b-from-30% mask-b-to-95%">
          <img
            alt=""
            loading="lazy"
            width="700"
            height="320"
            decoding="async"
            data-nimg="1"
            style={{ color: 'transparent' }}
            src="/_next/image?url=%2Fimages%2Flanding%2Ffeature-1.webp&amp;w=1920&amp;q=75"
          />
        </div>
      </div>
      <div className="bordered-div-padding relative space-y-8 border-b md:border-b-0 !pb-0" />
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-4">
          <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users-round size-5"
              aria-hidden="true"
            >
              <path d="M18 21a8 8 0 0 0-16 0"></path>
              <circle cx="10" cy="8" r="5"></circle>
              <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
            </svg>
            Real Time Collaboration
          </h2>
          <h3 className="text-foreground font-weight-display leading-snug md:text-xl">
            Built for content teams.
          </h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
          Draft, review, and publish content with confidence. Autosave, rich
          text editing, role-based permissions, and revision history come
          standard.
        </p>
      </div>
      <div className="flex flex-col gap-4 mask-b-from-30% mask-b-to-95%">
        <img
          alt=""
          loading="lazy"
          width="620"
          height="108"
          decoding="async"
          data-nimg="1"
          style={{ color: 'transparent' }}
          src="/_next/image?url=%2Fimages%2Flanding%2Ffeature-2-1.webp&amp;w=1920&amp;q=75"
        />
        <img
          alt=""
          loading="lazy"
          width="620"
          height="108"
          decoding="async"
          data-nimg="1"
          style={{ color: 'transparent' }}
          src="/_next/image?url=%2Fimages%2Flanding%2Ffeature-2-2.webp&amp;w=1920&amp;q=75"
        />
        <img
          alt=""
          loading="lazy"
          width="620"
          height="108"
          decoding="async"
          data-nimg="1"
          style={{ color: 'transparent' }}
          src="/_next/image?url=%2Fimages%2Flanding%2Ffeature-2-3.webp&amp;w=1920&amp;q=75"
        />
      </div>
      <div className="bordered-div-padding relative space-y-8">
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-4">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-images size-5"
                aria-hidden="true"
              >
                <path d="M18 22H4a2 2 0 0 1-2-2V6"></path>
                <path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18"></path>
                <circle cx="12" cy="8" r="2"></circle>
                <rect width="16" height="16" x="6" y="2" rx="2"></rect>
              </svg>
              Asset Management
            </h2>
            <h3 className="text-foreground font-weight-display leading-snug md:text-xl">
              Organize your media like a pro.
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
            Upload, crop, tag, and reuse images, videos, and docs with our sleek
            asset manager. Automatically optimizes files and handles CDN
            delivery.
          </p>
        </div>
      </div>
      <div className="bordered-div-padding relative space-y-8 border-t md:border-s">
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-4">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-toggle-left size-5"
                aria-hidden="true"
              >
                <circle cx="9" cy="12" r="3"></circle>
                <rect width="20" height="14" x="2" y="5" rx="7"></rect>
              </svg>
              Granular Permissions
            </h2>
            <h3 className="text-foreground font-weight-display leading-snug md:text-xl">
              Control who does what.
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
            Create roles for editors, developers, and guests with precision.
            Lock down fields, models, or even specific actions.
          </p>
        </div>
      </div>
    </section>
  );
}
