"use client";
import { Code2, Music2, SquareTerminal } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SpotifyPlaylist } from "./spotify-playlist";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { FigmaLogoIcon } from "@radix-ui/react-icons";
import { AnimatedBeamConvert } from "./animated-beam-convert";
import { AnimatedListFeatures } from "./animated-list-features";
import { MarqueeCleanCode } from "./marquee-clean-code";

export function PersonalValuation() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[352px] rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
    );
  }

  return (
    <>
      <BentoGrid className="w-full mx-auto md:auto-rows-[20rem] px-4">
        {items.map((item) => (
          <BentoCard key={item.name} {...item} />
        ))}
      </BentoGrid>
    </>
  );
}

const items = [
  {
    name: "Service",
    description:
      "Developing professional responsive websites, Landing pages, and webapplications",
    background: (
      <AnimatedListFeatures className="absolute right-0 top-2 h-[300px] w-full scale-80 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
    className: "md:col-span-1 order-1",
    Icon: SquareTerminal,
  },
  {
    name: "Converting",
    description: "Convert the design into pixel-perfect UI",
    background: (
      <div className="absolute right-0 top-2 w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105">
        <AnimatedBeamConvert />
      </div>
    ),
    className: "md:col-span-1 order-2",
    Icon: FigmaLogoIcon,
  },
  {
    name: "Music & Mood",
    description:
      "Throw on some hype beats and I’m instantly powered up, vibes max level⚡🎶",
    background: (
      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          initial: {
            backgroundPosition: "0 50%",
          },
          animate: {
            backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
          },
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute left-0 top-0 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      >
        <motion.div className="h-full w-full rounded-lg flex-1">
          <SpotifyPlaylist />
        </motion.div>
      </motion.div>
    ),
    className: "md:col-span-1 row-span-2 order-4 md:order-3",
    Icon: Music2,
  },
  {
    name: "Clean Code",
    description:
      "Writing mantainable, readable, efficient code and following best practices.",
    background: (
      <MarqueeCleanCode className="absolute right-0 top-2 w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
    className: "md:col-span-2 order-3 md:order-4",
    Icon: Code2,
  },
];
