'use client';
import { useMutation } from '@apollo/client/react';
import { INITIATE_CREATORS_IMPORT_QUERY_MUTATION } from '@workspace/gql/api/importAPI';
import {
  CreateImportQueueInput,
  DocumentQualityType,
  FileType,
  ImportTypes,
  ProcessType,
  ServiceType,
  UsersEntity
} from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@workspace/ui/components/sheet';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { HostNames } from '@workspace/ui/lib';
import { CloudDownload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ImportSingleCreatorSheetProps {
  user: UsersEntity | null;
}

const emptyInput = {
  serviceType: ServiceType.Ras,
  fileType: FileType.Image,
  qualityType: DocumentQualityType.HighDefinition,
  importType: ImportTypes.Profile,
  processType: ProcessType.Generator,
  totalContent: 10,
  subDirectory: '',
  exceptions: [],
  branchStart: 0,
  branchEnd: 0,
  pageStart: 0,
  pageEnd: 0,
  url: '',
  creatorId: ''
};

export const ImportSingleCreatorSheet: React.FC<ImportSingleCreatorSheetProps> = ({ user }) => {
  const [input, setInput] = useState<CreateImportQueueInput>({ ...emptyInput, creatorId: user?.id as string });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [exceptionInput, setExceptionInput] = useState<string>('');
  const [hasEditedSubDir, setHasEditedSubDir] = useState<boolean>(false);
  const [initiateImport] = useMutation(INITIATE_CREATORS_IMPORT_QUERY_MUTATION);

  const handleInitiate = async () => {
    setLoading(true);
    try {
      if (!user?.id) return;
      await initiateImport({ variables: { input } });
      toast.success('Job added, come back after a while');
    } catch {
      toast.error('Something wrong happened!');
    } finally {
      handleClose();
    }
  };

  const handleAddException = () => {
    if (exceptionInput.trim() !== '') {
      setInput((prev) => ({ ...prev, exceptions: [...(prev?.exceptions ?? []), exceptionInput.trim()] }));
      setExceptionInput('');
    }
  };

  const handleClose = () => {
    setLoading(false);
    setIsOpen((prev) => !prev);
    setInput(emptyInput);
  };

  const handleChangeInput = ({ key, value }: { key: keyof CreateImportQueueInput; value: string | number | string[] }) => {
    setInput((prev) => ({ ...prev, [key]: value }));
    if (key === 'url') {
      setHasEditedSubDir(false);
    }
  };

  useEffect(() => {
    if (!hasEditedSubDir && input.url) {
      const parts = input.url.split('/').filter(Boolean);
      setInput((prev) => ({ ...prev, subDirectory: parts.at(-1) ?? '' }));
    }
  }, [input.url, hasEditedSubDir]);

  useEffect(() => {
    const regex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    if (input.url.length && regex.test(input.url)) {
      switch (new URL(input.url).hostname) {
        case HostNames.WALLHAVEN:
          handleChangeInput({ key: 'qualityType', value: DocumentQualityType.LowDefinition });
          handleChangeInput({ key: 'importType', value: ImportTypes.Branch });
          break;
        case HostNames.OK:
          handleChangeInput({ key: 'qualityType', value: DocumentQualityType.DivDefinition });
          handleChangeInput({ key: 'importType', value: ImportTypes.Ok });
          break;
        case HostNames.SHORTS:
          handleChangeInput({ key: 'qualityType', value: DocumentQualityType.SourceDefinition });
          handleChangeInput({ key: 'importType', value: ImportTypes.Shorts });
          break;
      }
    }
  }, [input.url]);

  return (
    <Sheet onOpenChange={handleClose} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full" size={'sm'}>
          <CloudDownload className="h-3 w-3" />
          Import
        </Button>
      </SheetTrigger>
      <SheetContent className="p-1 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add new contents to {user && user?.username.toUpperCase()}</SheetTitle>
          <SheetDescription>{user ? `You are importing to ${user?.username}` : 'Be descriptive about site information'}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 space-y-1">
          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="site-url"
              type="url"
              placeholder="https://meow@example.com"
              required
              value={input.url}
              onChange={(e) => handleChangeInput({ key: 'url', value: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="file-type">SERVICE TYPE</Label>
            <Dropdown
              enumValue={ServiceType}
              filterBy={input.serviceType as ServiceType}
              onFilterBy={(val) => handleChangeInput({ key: 'serviceType', value: val as ServiceType })}
              trigger={{ label: input.serviceType }}
              label="File types"
            />
          </div>

          <div className="grid grid-cols-2 space-x-2">
            <div className="grid gap-2">
              <Label htmlFor="exclude">Content interval</Label>
              <Input
                id="exclude"
                type="text"
                placeholder={'0'}
                required
                value={input.totalContent}
                onChange={(e) => handleChangeInput({ key: 'totalContent', value: Number(e.target.value.replace(/[^0-9]/g, '')) })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subDirectory">Subdirectory</Label>
              <Input
                id="subDirectory"
                type="text"
                placeholder="chris"
                required
                autoComplete="subDirectory"
                value={input.subDirectory}
                onChange={(e) => {
                  handleChangeInput({ key: 'subDirectory', value: e.target.value });
                  setHasEditedSubDir(e.target.value.trim() !== '');
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 space-x-2">
            <div className="grid gap-2">
              <Label htmlFor="start" className="text-xs">
                BRANCH START {(input.branchStart ?? 0) * 50}
              </Label>
              <Input
                id="start"
                type="text"
                placeholder="0"
                required
                value={input.branchStart}
                onChange={(e) => handleChangeInput({ key: 'branchStart', value: Number(e.target.value.replace(/[^0-9]/g, '')) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="branchEnd" className="text-xs">
                BRANCH SPAN {((input.branchEnd ?? 0) - 1) * 50}
              </Label>
              <Input
                id="branchEnd"
                type="text"
                placeholder="0"
                required
                value={input.branchEnd}
                onChange={(e) => handleChangeInput({ key: 'branchEnd', value: Number(e.target.value.replace(/[^0-9]/g, '')) })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 space-x-2">
            <div className="grid gap-2">
              <Label htmlFor="pageStart" className="text-xs">
                PAGE START {input.pageStart}
              </Label>
              <Input
                id="pageStart"
                type="text"
                placeholder="0"
                required
                value={input.pageStart}
                onChange={(e) => handleChangeInput({ key: 'pageStart', value: Number(e.target.value.replace(/[^0-9]/g, '')) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pageEnd" className="text-xs">
                PAGE SPAN
              </Label>
              <Input
                id="pageEnd"
                type="text"
                placeholder="0"
                required
                value={input.pageEnd}
                onChange={(e) => handleChangeInput({ key: 'pageEnd', value: Number(e.target.value.replace(/[^0-9]/g, '')) })}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="grid grid-cols-2 space-x-2">
              <div className="grid gap-2">
                <Label htmlFor="quality-type">Quality type</Label>
                <Dropdown
                  enumValue={DocumentQualityType}
                  filterBy={input.qualityType as DocumentQualityType}
                  onFilterBy={(val) => handleChangeInput({ key: 'qualityType', value: val as DocumentQualityType })}
                  trigger={{ label: input.qualityType?.replace(/_/g, ' ') }}
                  label={'Quality types'}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="file-type">File type</Label>
                <Dropdown
                  enumValue={FileType}
                  filterBy={input.fileType as FileType}
                  onFilterBy={(val) => handleChangeInput({ key: 'fileType', value: val as FileType })}
                  trigger={{ label: input.fileType?.replace(/_/g, ' ') }}
                  label="File types"
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="features">Exceptions</Label>
              <div className="flex gap-2">
                <Input
                  value={exceptionInput}
                  onChange={(e) => setExceptionInput(e.target.value)}
                  placeholder="Add exceptions"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddException();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddException}>
                  Add
                </Button>
              </div>
            </div>
            <ul className="flex flex-row pl-2 text-xs space-x-1">
              {input.exceptions?.length &&
                input?.exceptions.map((f, i) => (
                  <li
                    key={i}
                    className="cursor-pointer"
                    onClick={() =>
                      handleChangeInput({ key: 'exceptions', value: input.exceptions?.filter((feature) => f !== feature) ?? [] })
                    }
                  >
                    {i + 1}.{f}
                  </li>
                ))}
            </ul>

            <div className="grid grid-cols-2 space-x-2">
              <div className="grid gap-2">
                <Label htmlFor="import-type">Import type</Label>
                <Dropdown
                  enumValue={ImportTypes}
                  filterBy={input.importType as ImportTypes}
                  onFilterBy={(val) => handleChangeInput({ key: 'importType', value: val as ImportTypes })}
                  trigger={{ label: input.importType?.replace(/_/g, ' ') }}
                  label="Import Types"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="file-type">PROCESS TYPE</Label>
                <Dropdown
                  enumValue={ProcessType}
                  filterBy={input.processType as ProcessType}
                  onFilterBy={(val) => handleChangeInput({ key: 'processType', value: val as ProcessType })}
                  trigger={{ label: input.processType?.replace(/_/g, ' ') }}
                  label="Process types"
                />
              </div>
            </div>
          </div>
        </div>

        <SheetFooter>
          <LoadingButton title="Submit" onClick={handleInitiate} disabled={!input.url} loading={loading} />
          <SheetClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
