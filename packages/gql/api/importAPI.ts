import { graphql } from '../generated';

export const INITIATE_CREATOR_OBJECTS_IMPORT_MUTATION = graphql(`
  mutation InitiateCreatorObjectsImport($input: CreateImportQueueInput!) {
    initiateCreatorObjectsImport(input: $input)
  }
`);

export const INITIATE_CREATORS_IMPORT_QUERY_MUTATION = graphql(`
  mutation Initiate($input: CreateImportQueueInput!) {
    initiate(input: $input)
  }
`);
