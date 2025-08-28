'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
  words: string[];
  typingSpeed?: number; // ms per char when typing
  deletingSpeed?: number; // ms per char when deleting
  delayBetween?: number; // ms pause after full word typed before deleting
  loop?: boolean;
  cursor?: string;
  className?: string;
};

export default function TypewriterArray({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  delayBetween = 1200,
  loop = true,
  cursor = '|',
  className
}: Props) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [display, setDisplay] = useState('');
  const [blink, setBlink] = useState(true);

  // Type / delete effect
  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex % words.length];
    let timeout: number;

    if (!isDeleting && charIndex <= currentWord.length) {
      // typing
      setDisplay(currentWord.slice(0, charIndex));
      timeout = window.setTimeout(
        () => setCharIndex((c) => c + 1),
        typingSpeed
      );
    } else if (isDeleting && charIndex >= 0) {
      // deleting
      setDisplay(currentWord.slice(0, charIndex));
      timeout = window.setTimeout(
        () => setCharIndex((c) => c - 1),
        deletingSpeed
      );
    }

    // When finished typing the whole word
    if (!isDeleting && charIndex === currentWord.length + 1) {
      // pause then start deleting
      timeout = window.setTimeout(() => {
        setIsDeleting(true);
        setCharIndex((c) => Math.max(0, c - 1));
      }, delayBetween);
    }

    // When finished deleting completely
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      if (!loop && wordIndex === words.length - 1) {
        // stop loop: keep last word typed and stop
        setDisplay(words[words.length - 1]);
        setIsDeleting(false);
        // Clear timeout and return
        return () => clearTimeout(timeout);
      }
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    charIndex,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    delayBetween,
    loop
  ]);

  // Blink cursor
  useEffect(() => {
    const id = window.setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className}>
      <motion.span key={`${wordIndex}-${display}`} aria-live="polite">
        {display}
      </motion.span>
      <motion.span
        aria-hidden
        className="ml-1 inline-block"
        initial={{ opacity: 1 }}
        animate={{ opacity: blink ? 1 : 0 }}
        transition={{
          duration: 0.5,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'mirror'
        }}
      >
        {cursor}
      </motion.span>
    </span>
  );
}
