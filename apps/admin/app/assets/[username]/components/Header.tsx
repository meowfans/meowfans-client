import { AssetType } from '@workspace/gql/generated/graphql';
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
import { GetCalender } from '@workspace/ui/globals/GetCalender';
import { motion } from 'framer-motion';
import { DoorClosed, GalleryVerticalEnd, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const emptyDateRange: DateRange = {
  from: undefined,
  to: undefined
};

interface Props {
  onRefresh: () => unknown;
  assetType: AssetType;
  onSlideShowOff: () => unknown;
  setAssetType: React.Dispatch<React.SetStateAction<AssetType>>;
}

export const AssetsHeader: React.FC<Props> = ({ onSlideShowOff, setAssetType, assetType, onRefresh }) => {
  const [fromDate] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(emptyDateRange);

  return (
    <div className="flex flex-row items-center justify-between bg-background">
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 text-white shadow-lg">
            <GalleryVerticalEnd size={20} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Assets</h1>
            <p className="text-sm text-muted-foreground">This is your personal Gallery</p>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row justify-between gap-2">
          <div>
            <Button onClick={onRefresh}>
              <RefreshCcw />
            </Button>
          </div>
          <div>
            <Button onClick={onSlideShowOff}>
              <DoorClosed />
            </Button>
          </div>
          <div className="grid gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{assetType}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Asset types</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={assetType} onValueChange={(val) => setAssetType(val as AssetType)}>
                  <DropdownMenuRadioItem value={AssetType.Private}>Private</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={AssetType.Hidden}>Hidden</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={AssetType.Archive}>Archive</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <GetCalender isOpen={fromDate} titleName={'From'} dateRange={dateRange} setDateRange={setDateRange} />
      </div>
    </div>
  );
};
