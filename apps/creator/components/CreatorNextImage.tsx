import { configService } from '@/util/config';
import { MEOW_FANS_BANNER } from '@workspace/ui/lib';
import { cn } from '@workspace/ui/lib/utils';
import Image, { ImageProps } from 'next/image';

interface NextImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  isDev?: boolean;
  imageUrl?: string | null;
  alt?: string;
  className?: string;
}

export const CreatorNextImage: React.FC<NextImageProps> = ({
  className,
  style,
  isDev = configService.NEXT_PUBLIC_NODE_ENV === 'development',
  imageUrl,
  alt = 'alt',
  ...props
}) => {
  const src = isDev || !imageUrl ? MEOW_FANS_BANNER : imageUrl;
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      className={cn('w-full h-auto', className)}
      style={{
        ...style,
        objectFit: 'contain',
        userSelect: 'none'
      }}
      width={0}
      height={0}
      unoptimized
      unselectable="on"
      sizes="100vw"
    />
  );
};
