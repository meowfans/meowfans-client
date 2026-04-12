'use client';

import { useCreatorsStore } from '@/hooks/store/creators.store';
import { useImportStore } from '@/hooks/store/import.store';
import { useVaultObjectsStore } from '@/hooks/store/vaults.store';
import { DownloadStates, GetAllObjectsCountOutput } from '@workspace/gql/generated/graphql';
import { eventEmitter } from '@workspace/ui/hooks/EventsEmitter';
import { EventTypes } from '@workspace/ui/lib';
import { useEffect } from 'react';

export const Events = () => {
 const setVaultObjects = useVaultObjectsStore((s) => s.setVaultObjects);
 const setUser = useCreatorsStore((s) => s.setUser);
 const setCreators = useCreatorsStore((s) => s.setCreators);
 const setObjectsCount = useVaultObjectsStore((s) => s.setObjectsCount);
 const setImportStatus = useImportStore((s) => s.setImportStatus);
 const setImportProcess = useImportStore((s) => s.setImportProcess);

 const updateVaultObjectStatus = (event: CustomEvent) => {
 const { data } = event.detail;
 const uploadResults = data.uploadResults as { id: string; status: DownloadStates }[];
 const statusMap = new Map(uploadResults.map((r) => [r.id, r.status]));

 setVaultObjects((prev) => prev.map((obj) => (statusMap.has(obj.id) ? { ...obj, status: statusMap.get(obj.id) || obj.status } : obj)));
 };

 const updateCreatorObjectsCount = (event: CustomEvent) => {
 const { data } = event.detail;
 const creatorId = data.creatorId as string;
 const counts = data.counts as GetAllObjectsCountOutput;

 setUser((prev) =>
  prev?.id === creatorId
  ? {
   ...prev,
   creatorProfile: {
    ...prev.creatorProfile,
    fulfilledObjectCount: counts.fulfilled,
    pendingObjectCount: counts.pending,
    processingObjectCount: counts.processing,
    rejectedObjectCount: counts.rejected
   }
   }
  : prev
 );

 setCreators((prev) =>
  prev.map((c) =>
  c.id === creatorId
   ? {
    ...c,
    creatorProfile: {
    ...c.creatorProfile,
    fulfilledObjectCount: counts.fulfilled,
    pendingObjectCount: counts.pending,
    processingObjectCount: counts.processing,
    rejectedObjectCount: counts.rejected
    }
   }
   : c
  )
 );
 };

 const updateObjectsCount = (event: CustomEvent) => {
 const { data } = event.detail;
 const counts = data.counts as GetAllObjectsCountOutput;

 setObjectsCount((prev) => ({ ...prev, objectsCount: counts }));
 };

 const updateImportStatus = (event: CustomEvent) => {
 const { data } = event.detail;
 const importStatus = data.message as string;
 const transmissionStatus = data.transmissionStatus as string;
 setImportStatus(importStatus);
 if (transmissionStatus === 'ENDED') {
  setImportProcess(null);
  setImportStatus('');
 }
 };

 const updateImportProcess = (event: CustomEvent) => {
 const {
  method,
  username,
  creatorId,
  totalBranches,
  processedBranches,
  totalPages,
  processedPages,
  totalUrls,
  processedUrls,
  totalProfiles,
  processedProfiles
 } = event.detail.data;

 setImportProcess({
  totalProfiles,
  processedProfiles,
  method,
  username,
  creatorId,
  totalBranches,
  processedBranches,
  totalPages,
  processedPages,
  totalUrls,
  processedUrls
 });
 };

 useEffect(() => {
 const updateHandler = (e: Event) => updateVaultObjectStatus(e as CustomEvent);
 const countUpdateHandler = (e: Event) => updateCreatorObjectsCount(e as CustomEvent);
 const globalCountUpdateHandler = (e: Event) => updateObjectsCount(e as CustomEvent);
 const importStatusHandler = (e: Event) => updateImportStatus(e as CustomEvent);
 const importProcessHandler = (e: Event) => updateImportProcess(e as CustomEvent);

 eventEmitter.addEventListener(EventTypes.VaultObjectStatus, countUpdateHandler);
 eventEmitter.addEventListener(EventTypes.CreatorObjectsCount, countUpdateHandler);
 eventEmitter.addEventListener(EventTypes.ObjectsCount, globalCountUpdateHandler);
 eventEmitter.addEventListener(EventTypes.ImportStatus, importStatusHandler);
 eventEmitter.addEventListener(EventTypes.ImportProcess, importProcessHandler);

 return () => {
  eventEmitter.removeEventListener(EventTypes.ImportStatus, importStatusHandler);
  eventEmitter.removeEventListener(EventTypes.ImportProcess, importProcessHandler);
  eventEmitter.removeEventListener(EventTypes.VaultObjectStatus, updateHandler);
  eventEmitter.removeEventListener(EventTypes.CreatorObjectsCount, countUpdateHandler);
  eventEmitter.removeEventListener(EventTypes.ObjectsCount, globalCountUpdateHandler);
 };
 }, []); // eslint-disable-line

 return null;
};
