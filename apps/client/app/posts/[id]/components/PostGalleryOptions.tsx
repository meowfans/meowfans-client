import { FullScreenButton, FullScreenButtonProps } from '@workspace/ui/globals/FullScreenButton';

interface PostGalleryOptionsProps {
  fullScreenButtonProps: FullScreenButtonProps;
}

export const PostGalleryOptions: React.FC<PostGalleryOptionsProps> = ({ fullScreenButtonProps }) => {
  const { currentIdx, currentUrl, urls } = fullScreenButtonProps;
  return (
    <div className="flex flex-col justify-self-end h-full">
      <div className="flex w-full p-2">
        <FullScreenButton currentIdx={currentIdx} currentUrl={currentUrl} urls={urls} />
      </div>
    </div>
  );
};
