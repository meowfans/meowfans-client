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
import { motion } from 'framer-motion';
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
 <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
   <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
   <Button
    variant="outline"
    size="sm"
    className="w-full sm:w-fit min-w-[100px] md:min-w-[120px] justify-between gap-1.5 h-8 px-3 text-[10px] font-bold uppercase tracking-wide border-primary/10 hover:border-primary/30 transition-all shadow-sm"
   >
    <div className="flex items-center gap-1.5">
    <Filter className="h-3 w-3 text-primary/60"/>
    <span>Status</span>
    </div>
    {status.length > 0 && status.length < Object.values(DownloadStates).length && (
    <span className="flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[8px] font-black">
     {status.length}
    </span>
    )}
   </Button>
   </motion.div>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start" className="w-56 p-2 rounded-xl border-primary/10 shadow-xl">
   <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pb-2">Filter by Status</DropdownMenuLabel>
   <DropdownMenuSeparator className="bg-primary/5"/>
   {Object.values(DownloadStates).map((s) => (
   <DropdownMenuCheckboxItem
    key={s}
    checked={status.includes(s)}
    className="rounded-lg focus:bg-primary/5 py-2"
    onCheckedChange={() => {
    setStatus((prev) => (prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]));
    }}
   >
    <div className="flex items-center gap-3">
    <div className="scale-110 opacity-70">{getStatusIcon(s)}</div>
    <span className="capitalize font-medium text-sm">{s.toLowerCase()}</span>
    </div>
   </DropdownMenuCheckboxItem>
   ))}
   <DropdownMenuSeparator className="bg-primary/5"/>
   <DropdownMenuCheckboxItem
   checked={status.length === Object.values(DownloadStates).length}
   onCheckedChange={(checked) => {
    if (checked) {
    setStatus(Object.values(DownloadStates));
    } else {
    setStatus([]);
    }
   }}
   className="justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground h-9"
   >
   Select All
   </DropdownMenuCheckboxItem>
   <DropdownMenuCheckboxItem
   checked={status.length === 0}
   onCheckedChange={() => setStatus([])}
   className="justify-center text-[10px] font-black uppercase tracking-widest text-destructive h-9"
   >
   Clear Filters
   </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
  </DropdownMenu>

  <DropdownMenu>
  <DropdownMenuTrigger asChild>
   <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
   <Button
    variant="outline"
    size="sm"
    className="w-full sm:w-fit min-w-[100px] md:min-w-[120px] justify-between gap-1.5 h-8 px-3 text-[10px] font-bold uppercase tracking-wide border-primary/10 hover:border-primary/30 transition-all shadow-sm"
   >
    <div className="flex items-center gap-1.5">
    <Filter className="h-3 w-3 text-primary/60"/>
    <span>File Types</span>
    </div>
    {fileTypes.length > 0 && (
    <span className="flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[8px] font-black">
     {fileTypes.length}
    </span>
    )}
   </Button>
   </motion.div>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start" className="w-56 p-2 rounded-xl border-primary/10 shadow-xl">
   <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pb-2">Filter by Type</DropdownMenuLabel>
   <DropdownMenuSeparator className="bg-primary/5"/>
   {Object.values(FileType).map((type) => (
   <DropdownMenuCheckboxItem 
    key={type} 
    checked={fileTypes.includes(type)} 
    className="rounded-lg focus:bg-primary/5 py-2"
    onCheckedChange={() => toggleFileType(type)}
   >
    <div className="flex items-center gap-3">
    <div className="scale-110 opacity-70">{getFileTypeIcon(type)}</div>
    <span className="capitalize font-medium text-sm">{type.toLowerCase()}</span>
    </div>
   </DropdownMenuCheckboxItem>
   ))}
   {fileTypes.length > 0 && (
   <>
    <DropdownMenuSeparator className="bg-primary/5"/>
    <DropdownMenuCheckboxItem
    checked={false}
    onCheckedChange={() => setFileTypes([])}
    className="justify-center text-[10px] font-black uppercase tracking-widest text-destructive h-9"
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
