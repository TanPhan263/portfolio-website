"use client";

import { ShareButtonProps } from "@/types/blog";
import { cn } from "@/shared/utils/common";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./button";
import {
  IconBrandFacebook,
  IconBrandX,
  IconLink,
  IconCheck,
} from "@tabler/icons-react";

export const ShareButtons = ({ url, title, description }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  const shareOnX = () => {
    const text = description ? `${title} - ${description}` : title;
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(xUrl, "_blank", "width=600,height=400");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Share:
      </span>

      <div className="flex items-center gap-2">
        {/* Facebook Share */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={shareOnFacebook}
            className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950 transition-colors"
          >
            <IconBrandFacebook size={16} className="text-blue-600" />
            <span className="hidden sm:inline">Facebook</span>
          </Button>
        </motion.div>

        {/* X (Twitter) Share */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={shareOnX}
            className="flex items-center gap-2 hover:bg-gray-50 hover:border-gray-400 dark:hover:bg-gray-800 transition-colors"
          >
            <IconBrandX
              size={16}
              className="text-gray-700 dark:text-gray-300"
            />
            <span className="hidden sm:inline">X</span>
          </Button>
        </motion.div>

        {/* Copy Link */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className={cn(
              "flex items-center gap-2 transition-all duration-300",
              copied
                ? "bg-green-50 border-green-300 text-green-700 dark:bg-green-950 dark:border-green-700 dark:text-green-300"
                : "hover:bg-gray-50 hover:border-gray-400 dark:hover:bg-gray-800"
            )}
          >
            <motion.div
              initial={false}
              animate={{ rotate: copied ? 360 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {copied ? (
                <IconCheck
                  size={16}
                  className="text-green-600 dark:text-green-400"
                />
              ) : (
                <IconLink
                  size={16}
                  className="text-gray-700 dark:text-gray-300"
                />
              )}
            </motion.div>
            <span className="hidden sm:inline">
              {copied ? "Copied!" : "Copy"}
            </span>
          </Button>
        </motion.div>
      </div>

      {/* Toast notification */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{
          opacity: copied ? 1 : 0,
          scale: copied ? 1 : 0.8,
          x: copied ? 0 : 20,
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <IconCheck size={16} />
        <span className="text-sm font-medium">Link copied to clipboard!</span>
      </motion.div>
    </div>
  );
};
