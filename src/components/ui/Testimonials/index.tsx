export default function Testimonials() {
  return (
    <section id="smart-productivity" className="pt-12 lg:pt-20">
      {/* Header */}
      <div className="border-y">
        <div className="container mx-auto flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <div className="inline-flex items-center rounded-md border bg-card px-3 py-0.5 text-sm font-normal tracking-tight text-foreground shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2"></path>
              <path d="M18 6h.01"></path>
              <path d="M6 18h.01"></path>
              <path d="M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z"></path>
              <path d="M18 11.66V22a4 4 0 0 0 4-4V6"></path>
            </svg>
            <span>Features</span>
          </div>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Smart productivity with AI
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Unlock smarter productivity with features that help you manage
            tasks, time, and focus—seamlessly.
          </p>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="container mx-auto border-x lg:!px-0">
        <div className="flex items-center max-lg:flex-col lg:divide-x">
          {/* Tabs */}
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="flex flex-1 flex-col items-center justify-center rounded-lg text-muted-foreground max-lg:border-x lg:border-t"
          >
            {/* Example Tab */}
            <button
              type="button"
              role="tab"
              aria-selected="true"
              className="group relative border-b px-1 py-5 text-start text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-background data-[state=active]:text-foreground lg:px-8"
            >
              <div className="absolute bottom-[-1px] left-0 z-10 h-[1px] w-1/2 bg-gradient-to-r from-blue-600 via-sky-300 to-transparent transition-all duration-300"></div>
              <div>
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                  </svg>
                  <h3 className="text-lg tracking-[-0.36px]">
                    Smart Task Management
                  </h3>
                </div>
                <p className="mt-2.5 tracking-[-0.32px] text-muted-foreground">
                  Create, prioritize, and delegate tasks effortlessly. AI helps
                  you identify what matters most with smart recommendations and
                  automated workflows.
                </p>
              </div>
            </button>
          </div>

          {/* Panel */}
          <div className="flex-1 px-6 py-[38px] max-lg:border-x">
            <div className="flex justify-center">
              <img
                src="/images/homepage/features-1.png"
                alt="Smart Task Management"
                className="m-3 rounded-md object-contain shadow-md lg:rounded-xl lg:shadow-lg dark:invert"
                width={400}
                height={510}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container mx-auto h-full w-full border-x"></div>
      </div>
    </section>
  );
}
