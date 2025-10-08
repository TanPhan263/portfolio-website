import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCloudinaryUrl(id: string) {
  return `${process.env.NEXT_PUBLIC_CLOUNDINARY_URL
    }v${new Date().getTime()}/${id}.webp`;
}
