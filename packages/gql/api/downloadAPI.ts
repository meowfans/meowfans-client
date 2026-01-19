import { graphql } from '../generated';

export const DOWNLOAD_ALL_CREATOR_OBJECTS_MUTATION = graphql(`
  mutation DownloadAllCreatorObjects($input: DownloadAllCreatorObjectsAsBatchInput!) {
    downloadAllCreatorObjects(input: $input)
  }
`);

export const TERMINATE_ALL_DOWNLOADING_MUTATION = graphql(`
  mutation TerminateDownloading {
    terminateDownloading
  }
`);
