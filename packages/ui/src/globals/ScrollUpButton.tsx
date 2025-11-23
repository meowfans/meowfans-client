import { ButtonProps } from '@radix-ui/themes';
import { ArrowBigUp } from 'lucide-react';
import React, { RefObject } from 'react';
import { Button } from '@workspace/ui/components/button';

interface ScrollUpButtonProps extends ButtonProps {
  topRef: RefObject<HTMLDivElement | null>;
}

export const ScrollUpButton: React.FC<ScrollUpButtonProps> = ({ topRef }) => {
  return (
    <Button
      className="rounded-2xl"
      onClick={() => {
        requestAnimationFrame(() => {
          topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }}
    >
      <ArrowBigUp />
    </Button>
  );
};
