import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { CreatorSignupInput } from '@workspace/ui/lib/types';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, User } from 'lucide-react';

interface CreatorSignupFirstStepProps {
  input: CreatorSignupInput;
  errors: Partial<Record<keyof CreatorSignupInput, string>>;
  setInput: React.Dispatch<React.SetStateAction<CreatorSignupInput>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof CreatorSignupInput, string>>>>;
  handleNextStep: () => void;
}

export const CreatorSignupFirstStep = ({ input, errors, setInput, setErrors, handleNextStep }: CreatorSignupFirstStepProps) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
          Legal Full Name
        </Label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-400 transition-colors">
            <User className="w-4 h-4" />
          </div>
          <Input
            id="fullName"
            placeholder="John Doe"
            className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 h-12 pl-10 focus-visible:ring-orange-500/50"
            value={input.fullName}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, fullName: e.target.value }));
              setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
          />
        </div>
        {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
          Work Email
        </Label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-400 transition-colors">
            <Mail className="w-4 h-4" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="creator@brand.com"
            className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 h-12 pl-10 focus-visible:ring-orange-500/50"
            value={input.email}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, email: e.target.value.trim() }));
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
          />
        </div>
        {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
      </div>

      <Button
        type="button"
        onClick={handleNextStep}
        className="w-full bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold h-12 rounded-xl"
      >
        Continue <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </motion.div>
  );
};
