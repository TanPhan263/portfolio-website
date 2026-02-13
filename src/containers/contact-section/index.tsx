'use client';

import { Button } from '@/components/ui/button';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/shared/utils/common';
import { IconMailFilled, IconSend } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { FormEvent, useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left — Heading */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2">
              <IconMailFilled className="size-6" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Get in Touch
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-black dark:text-white">
              Let&apos;s Work Together
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-md">
              Have a project in mind, want to collaborate, or just want to say
              hi? Drop me a message and I&apos;ll get back to you as soon as
              possible.
            </p>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl border p-2 md:rounded-3xl md:p-3">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="relative rounded-xl bg-card p-5 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={status === 'sending'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === 'sending'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project or just say hello..."
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      disabled={status === 'sending'}
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === 'sending'}
                      className="min-w-[140px]"
                    >
                      {status === 'sending' ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <IconSend className="size-4" />
                        </>
                      )}
                    </Button>

                    {status === 'success' && (
                      <p
                        className={cn(
                          'text-sm font-medium text-green-600 dark:text-green-400'
                        )}
                      >
                        Message sent! I&apos;ll get back to you soon.
                      </p>
                    )}
                    {status === 'error' && (
                      <p className="text-sm font-medium text-red-600 dark:text-red-400">
                        {errorMsg}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
