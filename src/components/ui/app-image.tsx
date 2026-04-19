// components/app-image.tsx
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

const FALLBACK_SRC = '/fallback.png';

export default function AppImage(props: ImageProps) {
  const { src, onError, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src && src !== 'null' ? src : FALLBACK_SRC);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={e => {
        setImgSrc(FALLBACK_SRC);
        onError?.(e);
      }}
    />
  );
}
