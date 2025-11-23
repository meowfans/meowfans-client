'use client';

import Link from 'next/link';

interface LinkDescriptionProps {
  description?: string;
  href: string;
  className?: string;
}

export const LinkDescription: React.FC<LinkDescriptionProps> = ({ description, href, className }) => {
  return (
    <>
      {' '}
      <Link href={href} className={className || 'underline text-pink-500 hover:text-blue-500'}>
        {description}
      </Link>{' '}
    </>
  );
};
