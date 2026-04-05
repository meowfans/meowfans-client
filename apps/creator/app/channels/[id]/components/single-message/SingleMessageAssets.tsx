import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { Carousel } from '@workspace/ui/globals/Carousel';

interface SingleMessageAssetsProps {
  message: MessagesOutput;
}

export const SingleMessageAssets: React.FC<SingleMessageAssetsProps> = ({ message }) => {
  return (
    message.messageAssets?.length > 0 && (
      <div className="flex flex-col gap-2 mb-2 z-30 w-70 max-w-full">
        <Carousel
          items={message.messageAssets}
          getKey={(item) => item.id}
          getUrl={(item) => item.rawUrl}
          getFileType={(item) => item.fileType as any}
          urls={message.messageAssets.map((asset) => asset.rawUrl)}
        />
      </div>
    )
  );
};
