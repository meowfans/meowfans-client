'use client';

import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { useBackground } from '@workspace/ui/hooks/useBackground';
import { BackGroundColors } from '@workspace/ui/lib/enums';
import { Computer } from 'lucide-react';

export const BackgroundDropdown = () => {
  const { bgColor, setBgColor } = useBackground();

  return (
    <Dropdown
      enumValue={BackGroundColors}
      filterBy={bgColor}
      onFilterBy={(val) => setBgColor(val)}
      trigger={{ icon: Computer }}
      label="Set background"
      title="Change background"
      modifyTo={(key) => key.replace(/_/g, ' ')}
    />
  );
};
