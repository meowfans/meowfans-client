'use client';

import { LucideIcon } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';

interface Props<T extends Record<string, string>> {
  label?: string;
  trigger: { icon?: LucideIcon; label?: string };
  enumValue: T;
  filterBy: T[keyof T];
  title?: string;
  onFilterBy: (val: T[keyof T]) => unknown;
}

export function Dropdown<T extends Record<string, string>>({ label = 'Label', title, filterBy, enumValue, onFilterBy, trigger }: Props<T>) {
  const dropdownMenuItems = Object.entries(enumValue).map(([key, value]) => ({ key, value }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" title={title}>
          {trigger.icon ? <trigger.icon /> : trigger.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={filterBy} onValueChange={(val) => onFilterBy(val as T[keyof T])}>
          {dropdownMenuItems.map(({ key, value }, idx) => (
            <DropdownMenuRadioItem key={idx} value={value}>
              {key}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
