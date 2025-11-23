'use client';
import { CreatorContext } from '@/hooks/context/CreatorContextWrapper';
import { useMutation } from '@apollo/client/react';
import { INITIATE_CREATORS_IMPORT_QUERY_MUTATION } from '@workspace/gql/api/importAPI';
import { DocumentQualityType, FileType, ImportTypes, ServiceType } from '@workspace/gql/generated/graphql';
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
import { Switch } from '@workspace/ui/components/switch';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { HostNames } from '@workspace/ui/lib';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const ImportCreatorsSheet = () => {
  const [user] = useContext(CreatorContext);
  const [url, setUrl] = useState<string>('');
  const [start, setStart] = useState<number>(0);
  const [exclude, setExclude] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [exceptions, setExceptions] = useState<string[]>([]);
  const [totalContent, setTotalContent] = useState<number>(10);
  const [subDirectory, setSubDirectory] = useState<string>('');
  const [isNewCreator, setIsNewCreator] = useState<boolean>(false);
  const [exceptionInput, setExceptionInput] = useState<string>('');
  const [fileType, setFileType] = useState<FileType>(FileType.Image);
  const [hasEditedSubDir, setHasEditedSubDir] = useState<boolean>(false);
  const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.Ras);
  const [importType, setImportType] = useState<ImportTypes>(ImportTypes.Page);
  const [initiateImport] = useMutation(INITIATE_CREATORS_IMPORT_QUERY_MUTATION);
  const [qualityType, setQualityType] = useState<DocumentQualityType>(DocumentQualityType.HighDefinition);

  const handleInitiate = async () => {
    setLoading(true);
    try {
      await initiateImport({
        variables: {
          input: {
            serviceType,
            creatorId: user.getCreatorProfile.creatorId,
            url: url.trim(),
            fileType,
            qualityType,
            totalContent,
            subDirectory: subDirectory.trim(),
            exclude,
            importType,
            start,
            exceptions,
            isNewCreator
          }
        }
      });
      toast.success('Job added, come back after a while');
    } catch (error) {
      toast.error('Something wrong happened!');
    } finally {
      handleClose();
    }
  };

  const handleAddException = () => {
    if (exceptionInput.trim() !== '') {
      setExceptions([...exceptions, exceptionInput.trim()]);
      setExceptionInput('');
    }
  };

  const handleClose = () => {
    setLoading(false);
    setUrl('');
    setFileType(FileType.Image);
    setQualityType(DocumentQualityType.HighDefinition);
    setTotalContent(10);
    setSubDirectory('');
    setImportType(ImportTypes.Page);
    setHasEditedSubDir(false);
    setStart(0);
    setExclude(0);
    setIsNewCreator(false);
    setExceptions([]);
    setIsOpen((prev) => !prev);
    setServiceType(ServiceType.Ras);
  };

  useEffect(() => {
    if (!hasEditedSubDir && url) {
      const parts = url.split('/').filter(Boolean);
      setSubDirectory(parts.at(-1) ?? '');
    }
  }, [url, hasEditedSubDir]);

  useEffect(() => {
    const regex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    if (url.length && regex.test(url)) {
      switch (new URL(url).hostname) {
        case HostNames.WALLHAVEN:
          setQualityType(DocumentQualityType.LowDefinition);
          setImportType(ImportTypes.Branch);
          break;
        case HostNames.OK:
          setQualityType(DocumentQualityType.DivDefinition);
          setImportType(ImportTypes.Ok);
          break;
        case HostNames.SHORTS:
          setQualityType(DocumentQualityType.SourceDefinition);
          setImportType(ImportTypes.Shorts);
          setTotalContent(5);
          break;
      }
    }
  }, [url]);

  return (
    <Sheet onOpenChange={handleClose} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Import</Button>
      </SheetTrigger>
      <SheetContent className="p-1">
        <SheetHeader>
          <SheetTitle>Add new contents {user && ' ✅🚀'}</SheetTitle>
          <SheetDescription>Be descriptive about site information</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 space-y-1">
          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="site-url"
              type="url"
              placeholder="https://meow@example.com"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="grid gap-2">
              <Label htmlFor="file-type">SERVICE TYPE</Label>
              <Dropdown
                enumValue={ServiceType}
                filterBy={serviceType}
                onFilterBy={(val) => setServiceType(val as ServiceType)}
                trigger={{ label: serviceType }}
                label="File types"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="exclude">Content interval</Label>
              <Input
                id="exclude"
                type="text"
                placeholder="0"
                required
                value={totalContent}
                onChange={(e) => setTotalContent(Number(e.target.value.replace(/[^0-9]/g, '')))}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3 space-y-1">
            <div className="grid gap-2">
              <Label htmlFor="subDirectory">Subdirectory</Label>
              <Input
                id="subDirectory"
                type="text"
                placeholder="chris"
                required
                autoComplete="subDirectory"
                value={subDirectory}
                onChange={(e) => {
                  setSubDirectory(e.target.value);
                  setHasEditedSubDir(e.target.value.trim() !== '');
                }}
              />
            </div>
            <div className="flex flex-col gap-1 space-y-1 items-center content-center">
              <Label htmlFor="newUser" className="text-xs">
                NewCreator
              </Label>
              <Switch
                checked={isNewCreator}
                onCheckedChange={(checked: boolean) => {
                  setIsNewCreator(checked);
                  setImportType(ImportTypes.Profile);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 space-x-2">
            <div className="grid gap-2">
              <Label htmlFor="start">Start</Label>
              <Input
                id="start"
                type="text"
                placeholder="0"
                required
                value={start}
                onChange={(e) => setStart(Number(e.target.value.replace(/[^0-9]/g, '')))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="exclude">Exclude / Span</Label>
              <Input
                id="exclude"
                type="text"
                placeholder="0"
                required
                value={exclude}
                onChange={(e) => setExclude(Number(e.target.value.replace(/[^0-9]/g, '')))}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="grid grid-cols-2 space-x-1">
              <div className="grid gap-2">
                <Label htmlFor="quality-type">Quality type</Label>
                <Dropdown
                  enumValue={DocumentQualityType}
                  filterBy={qualityType}
                  onFilterBy={(val) => setQualityType(val as DocumentQualityType)}
                  trigger={{ label: qualityType.replace(/_/g, ' ') }}
                  label={'Quality types'}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="file-type">File type</Label>
                <Dropdown
                  enumValue={FileType}
                  filterBy={fileType}
                  onFilterBy={(val) => setFileType(val as FileType)}
                  trigger={{ label: fileType.replace(/_/g, ' ') }}
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
              {exceptions.map((f, i) => (
                <li key={i} className="cursor-pointer" onClick={() => setExceptions((prev) => prev.filter((feature) => f !== feature))}>
                  {i + 1}.{f}
                </li>
              ))}
            </ul>

            <div className="grid gap-2">
              <Label htmlFor="import-type">Import type</Label>
              <Dropdown
                enumValue={ImportTypes}
                filterBy={importType}
                onFilterBy={(val) => setImportType(val as ImportTypes)}
                trigger={{ label: importType.replace(/_/g, ' ') }}
                label="Import Types"
              />
            </div>
          </div>
        </div>

        <SheetFooter>
          <LoadingButton title="Submit" onClick={handleInitiate} disabled={!url} loading={loading} />
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
