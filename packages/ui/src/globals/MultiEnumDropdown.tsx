'use client';

import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { LucideIcon } from 'lucide-react';

interface MultiEnumDropdownProps<T extends Record<string, string>> {
  label?: string;
  trigger: { icon?: LucideIcon; label?: string };
  enumValue: T;
  value: Array<T[keyof T]>;
  onChange: (val: Array<T[keyof T]>) => void;
  modifyTo?: (key: keyof T, value: T[keyof T]) => string;
}

export function MultiEnumDropdown<T extends Record<string, string>>({
  label = 'Label',
  trigger,
  enumValue,
  value,
  onChange,
  modifyTo
}: MultiEnumDropdownProps<T>) {
  const items = Object.entries(enumValue).map(([key, val]) => ({
    key: key as keyof T,
    value: val as T[keyof T]
  }));

  const normalize = (key: keyof T, val: T[keyof T]) => (modifyTo ? modifyTo(key, val) : String(key));

  const toggle = (val: T[keyof T], checked: boolean) => {
    onChange(checked ? [...value, val] : value.filter((v) => v !== val));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {trigger.icon ? <trigger.icon /> : trigger.label}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {items.map(({ key, value: val }) => (
          <DropdownMenuCheckboxItem
            key={String(key)}
            checked={value.includes(val)}
            onCheckedChange={(checked) => toggle(val, Boolean(checked))}
          >
            {normalize(key, val)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
