import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Textarea } from '@workspace/ui/components/textarea';

interface PostCaptionProps {
  caption: string;
  onSetPostCation: (caption: string) => void;
}

export const PostCaption = ({ caption, onSetPostCation }: PostCaptionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Caption</CardTitle>
        <CardDescription>Add a description to your post</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Write your caption here..."
            value={caption}
            onChange={(e) => onSetPostCation(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground text-right">{caption.length} characters</p>
        </div>
      </CardContent>
    </Card>
  );
};
