import { graphql } from '../generated';

export const TERMINATE_ALL_DOWNLOADING_MUTATION = graphql(`
  mutation TerminateDownloading {
    terminateDownloading
  }
`);
