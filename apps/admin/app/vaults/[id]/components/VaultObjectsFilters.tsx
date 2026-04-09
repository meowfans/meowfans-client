'use client';

import { DownloadStates, FileType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { Filter } from 'lucide-react';
import React from 'react';
import { getFileTypeIcon, getStatusIcon } from './VaultObjectsIcons';

interface VaultObjectsFiltersProps {
  status: DownloadStates[];
  setStatus: React.Dispatch<React.SetStateAction<DownloadStates[]>>;
  fileTypes: FileType[];
  setFileTypes: React.Dispatch<React.SetStateAction<FileType[]>>;
}

export function VaultObjectsFilters({ status, setStatus, fileTypes, setFileTypes }: VaultObjectsFiltersProps) {
  const toggleFileType = (type: FileType) => {
    setFileTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-fit min-w-[120px] justify-between gap-2 h-9 px-3 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Status</span>
            </div>
            {status.length > 0 && status.length < Object.values(DownloadStates).length && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-[10px] font-bold">
                {status.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.values(DownloadStates).map((s) => (
            <DropdownMenuCheckboxItem
              key={s}
              checked={status.includes(s)}
              onCheckedChange={() => {
                setStatus((prev) => (prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]));
              }}
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(s)}
                <span className="capitalize">{s.toLowerCase()}</span>
              </div>
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={status.length === Object.values(DownloadStates).length}
            onCheckedChange={(checked) => {
              if (checked) {
                setStatus(Object.values(DownloadStates));
              } else {
                setStatus([]);
              }
            }}
            className="justify-center text-muted-foreground"
          >
            Select All
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={status.length === 0}
            onCheckedChange={() => setStatus([])}
            className="justify-center text-muted-foreground text-destructive"
          >
            Clear Filters
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-fit min-w-[120px] justify-between gap-2 h-9 px-3 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
              <span>File Types</span>
            </div>
            {fileTypes.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-[10px] font-bold">
                {fileTypes.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.values(FileType).map((type) => (
            <DropdownMenuCheckboxItem key={type} checked={fileTypes.includes(type)} onCheckedChange={() => toggleFileType(type)}>
              <div className="flex items-center gap-2">
                {getFileTypeIcon(type)}
                <span className="capitalize">{type.toLowerCase()}</span>
              </div>
            </DropdownMenuCheckboxItem>
          ))}
          {fileTypes.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={false}
                onCheckedChange={() => setFileTypes([])}
                className="justify-center text-muted-foreground text-destructive"
              >
                Clear Filters
              </DropdownMenuCheckboxItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
