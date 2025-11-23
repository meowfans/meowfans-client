'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { legalAndAppPaths } from '@/lib/constants';
import type { ButtonProps } from '@workspace/ui/lib';
import { Search, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';

export const SearchButton: React.FC<ButtonProps> = ({ variant = 'outline', size = 'icon', title = 'Search', className, ...props }) => {
  const pathName = usePathname();
  const { clickedSearch, setClickedSearch } = useUtilsStore();

  return legalAndAppPaths.includes(pathName) ? null : (
    <Button variant={variant} size={size} onClick={() => setClickedSearch(!clickedSearch)} className={`${className}`} {...props}>
      {clickedSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
    </Button>
  );
};
