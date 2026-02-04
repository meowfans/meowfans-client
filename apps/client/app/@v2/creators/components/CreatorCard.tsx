import { useFollowingMutations } from "@/hooks/useFollow";
import { GetDefaultCreatorsOutput } from "@workspace/gql/generated/graphql";
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { motion } from "framer-motion";
import { Link, User, BadgeCheck, Heart, Plus } from "lucide-react";

interface CreatorCardProps {
  creator: GetDefaultCreatorsOutput;
  index: number;
}

export const CreatorCard = ({ creator, index }: CreatorCardProps) => {
  const { followCreator } = useFollowingMutations();

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05, duration: 0.3 }}>
      <Card className="group relative overflow-hidden border-border bg-secondary/40 transition-all duration-300 hover:border-indigo-500/50 hover:bg-secondary/60 hover:shadow-lg hover:shadow-indigo-500/10">
        <Link href={`/creators/${creator.username}`} className="block p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="absolute -inset-2 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50" />
              <Avatar className="h-24 w-24 border-2 border-border transition-transform duration-300 group-hover:scale-105 group-hover:border-foreground">
                <AvatarImage src={creator.avatarUrl} alt={creator.username} className="object-cover" />
                <AvatarFallback className="bg-secondary text-muted-foreground">
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="mb-1 flex items-center justify-center gap-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-indigo-400 transition-colors">{creator.username}</h3>
              <BadgeCheck className="h-4 w-4 text-blue-500" />
            </div>

            <p className="text-sm text-muted-foreground">@{creator.username}</p>
          </div>
        </Link>

        <div className="mt-4 px-6 pb-6 w-full">
          {creator.isFollowing ? (
            <Button
              variant="secondary"
              size="sm"
              className="w-full gap-2 border border-border bg-secondary/50 text-foreground hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                followCreator(creator.id);
              }}
            >
              <Heart className="h-4 w-4 fill-current" />
              <span>Following</span>
            </Button>
          ) : (
            <Button
              size="sm"
              className="w-full gap-2 bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-500/20"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                followCreator(creator.id);
              }}
            >
              <Plus className="h-4 w-4" />
              <span>Follow</span>
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
