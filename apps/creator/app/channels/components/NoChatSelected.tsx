import { MessageSquare } from 'lucide-react';

export function NoChatSelected() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-full p-12 text-center bg-background/5 min-h-[500px]">
      <div className="p-8 rounded-full bg-secondary/20 mb-8 border border-border/10 opacity-40">
        <MessageSquare className="h-14 w-14 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-black mb-3 tracking-tighter uppercase">No Chat Selected</h3>
      <p className="text-muted-foreground max-w-sm text-[11px] font-medium leading-relaxed uppercase tracking-widest opacity-60">
        Select a conversation from the sidebar to start interacting with your community.
      </p>
    </div>
  );
}
