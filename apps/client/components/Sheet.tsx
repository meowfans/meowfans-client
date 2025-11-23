import { redirectToAuthApp } from '@/util/helpers';
import { Button } from '@workspace/ui/components/button';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@workspace/ui/components/sheet';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Contents } from './Explore';
interface Props {
  contents: Contents[];
  setHighLightedId: React.Dispatch<React.SetStateAction<string | null>>;
  divRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}

export const LandingContentSheet: React.FC<Props> = ({ contents, setHighLightedId, divRefs }) => {
  const router = useRouter();
  const handleScrollToDiv = (id: string) => {
    const element = divRefs.current[id];

    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const highLightEvent = new CustomEvent('highlight-div', { detail: { id } });
    window.dispatchEvent(highLightEvent);
  };

  useEffect(() => {
    const handleHighlight = (event: CustomEvent) => {
      if (event.detail.id) {
        setHighLightedId(event.detail.id);
        setTimeout(() => setHighLightedId(null), 3000);
      }
    };

    window.addEventListener('highlight-div', handleHighlight as EventListener);
    return () => {
      window.removeEventListener('highlight-div', handleHighlight as EventListener);
    };
  }, [divRefs.current.id]); //eslint-disable-line

  useEffect(() => {
    const ref = divRefs.current;
    return () => {
      Object.keys(ref).forEach((key) => {
        delete ref[key];
      });
    };
  }, [divRefs]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" autoFocus={false}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Meow</SheetTitle>
          <SheetDescription>A platform where creators are valued.</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 gap-6  px-4">
          {contents.map((content, idx) => (
            <div
              key={idx}
              className="shadow rounded-xl items-center content-center cursor-pointer transform ease-in p-1"
              onClick={() => handleScrollToDiv(content.id)}
            >
              <p className="text-accent-foreground flex flex-row gap-3">
                <content.icon />
                {content.label}
              </p>
            </div>
          ))}
        </div>
        <SheetFooter>
          <Button onClick={() => router.push(redirectToAuthApp({ pathname: '/creator-signup' }))}>Become a Creator</Button>
          <Button variant="outline" onClick={() => router.push(redirectToAuthApp({ pathname: '/signup' }))}>
            Become a Fan
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
