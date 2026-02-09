import { MessageSquare } from 'lucide-react';

export default function NoChatSelected() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-full p-12 text-center bg-muted/5 min-h-[500px]">
      <div className="p-8 rounded-full bg-card mb-8 shadow-inner border opacity-40">
        <MessageSquare className="h-16 w-16 text-muted-foreground" />
      </div>
      <h3 className="text-3xl font-bold mb-3 tracking-tight">No Chat Selected</h3>
      <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
        Select a conversation from the sidebar to start messaging your fans and manage your community.
      </p>
    </div>
  );
}
