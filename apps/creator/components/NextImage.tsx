'use client';

import { replaceUrl } from '@workspace/ui/lib/helpers';
import Image, { ImageProps } from 'next/image';

export function NextImage({ src, alt, ...props }: ImageProps) {
  return <Image src={replaceUrl(src as string) || '/placeholder-content.png'} alt={alt || ''} {...props} />;
}
