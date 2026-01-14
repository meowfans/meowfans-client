'use client';

import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { useBackground } from '@workspace/ui/hooks/useBackground';
import { BackGroundColors } from '@workspace/ui/lib/enums';
import { Computer } from 'lucide-react';
import { toast } from 'sonner';

export const BackgroundDropdown = () => {
  const { bgColor, setBgColor } = useBackground();

  return (
    <Dropdown
      enumValue={BackGroundColors}
      filterBy={bgColor}
      onFilterBy={(val) => {
        setBgColor(val);
        toast.success('Refresh your page', {
          description: 'Changes may take some time to take effect'
        });
      }}
      trigger={{ icon: Computer }}
      label="Set background"
      title="Change background"
      modifyTo={(key) => key.replace(/_/g, ' ')}
    />
  );
};
