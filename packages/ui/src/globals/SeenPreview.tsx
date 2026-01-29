import { Check, CheckCheck } from 'lucide-react';

interface SeenPreviewProps {
  isSender: boolean;
  seen: boolean;
}

export const SeenPreview: React.FC<SeenPreviewProps> = ({ seen, isSender }) => {
  if (!isSender) return null;
  return seen ? <CheckCheck className="text-sky-500 w-3 h-3" /> : <Check className="w-3 h-3" />;
};
