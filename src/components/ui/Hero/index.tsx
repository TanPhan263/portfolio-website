export default function Hero() {
  return (
    <section className="">
      <div className="container mx-auto">
        <div className="bordered-div-padding relative flex flex-col items-center gap-8 border-x text-center md:gap-10 lg:gap-16 lg:!py-25">
          <div className="max-w-4xl space-y-6 md:space-y-8 lg:space-y-12">
            <a
              className="relative inline-flex items-center overflow-hidden rounded-sm p-[1px]"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="absolute h-full w-full"
                width="100%"
                height="100%"
              >
                <rect fill="none" width="100%" height="100%"></rect>
              </svg>
              <div
                style={{
                  position: 'absolute',
                  top: '0px',
                  left: '0px',
                  display: 'inline-block',
                  transform:
                    'translateX(0px) translateY(25.6509px) translateX(-50%) translateY(-50%)'
                }}
              >
                <div className="h-18 w-25 bg-[radial-gradient(#00A656_40%,transparent_60%)] opacity-[0.8]"></div>
              </div>
              <button
                data-slot="button"
                className="inline-flex items-center cursor-pointer justify-center tracking-normal whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-card hover:bg-accent hover:text-accent-foreground dark:bg-[#232222] dark:border-input dark:hover:bg-[#232222] h-8 rounded-sm gap-1.5 px-3 has-[&gt;svg]:px-2.5 relative border-none"
              >
                Public beta is starting next week
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
                  className="lucide lucide-arrow-right ml-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </a>
            <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
              Fast, flexible, and{' '}
              <span className="block">developer-first CMS.</span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-[700px] text-sm leading-relaxed md:text-lg lg:text-xl">
              Scalar CMS gives you full control over content with a streamlined,
              API-first experience—perfect for teams who want speed without
              sacrificing flexibility.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a
              data-slot="button"
              className="inline-flex items-center cursor-pointer justify-center tracking-normal whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 md:h-12 px-6 md:px-7 py-2 rounded-full gap-3.5 text-sm md:text-base font-weight-display"
              href="#"
            >
              Start Free Trial
            </a>
            <a
              data-slot="button"
              className="inline-flex items-center cursor-pointer justify-center tracking-normal whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-card hover:bg-accent hover:text-accent-foreground dark:bg-[#232222] dark:border-input dark:hover:bg-[#232222] h-10 md:h-12 px-6 md:px-7 py-2 rounded-full gap-3.5 text-sm md:text-base font-weight-display"
              href="#"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 640 512"
                className="size-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
              </svg>
              Community
            </a>
          </div>
          <div
            className="pointer-events-none absolute top-0 left-full hidden h-[calc(100%+1px)] w-screen overflow-hidden border-b text-start select-none lg:block"
            aria-hidden="true"
            role="presentation"
          >
            <p className="p-4 whitespace-pre opacity-20"></p>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="bordered-div-padding flex items-center justify-center border">
          <img
            alt="Hero Image"
            width="1320"
            height="743"
            decoding="async"
            data-nimg="1"
            className="mask-b-from-55% mask-b-to-95%"
            style={{ color: 'transparent' }}
            src="/_next/image?url=%2Fimages%2Flanding%2Fhero.webp&amp;w=3840&amp;q=75"
          />
        </div>
      </div>
    </section>
  );
}
