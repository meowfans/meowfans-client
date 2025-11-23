'use client';
import { ArrowBigDown } from 'lucide-react';
import { Button } from '../components/button';

interface Props {
  onClick: () => unknown;
}

export const ScrollToTheBottom: React.FC<Props> = ({ onClick }) => {
  return (
    <Button variant="default" className="cursor-pointer absolute bottom-15 right-4 rounded-full z-50 shadow-lg" onClick={onClick}>
      <ArrowBigDown />
    </Button>
  );
};
