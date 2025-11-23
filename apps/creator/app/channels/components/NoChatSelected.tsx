import { ShadCnBackgrounds } from '@workspace/ui/lib';

interface Props {
  onClick?: () => unknown;
  background?: ShadCnBackgrounds | null;
}

export const NoChatSelected: React.FC<Props> = ({ background }) => {
  return (
    <div className="flex justify-center flex-col h-[calc(100vh-68px)]">
      <h1 className="text-4xl text-center justify-center tracking-tight font-bold">Select a channel to start messaging</h1>
      <p className="text-xl justify-center text-center opacity-80">Where meows come alive</p>
    </div>
  );
};
