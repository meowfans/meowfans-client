import { graphql } from '../generated';

export const INITIATE_CREATORS_IMPORT_QUERY_MUTATION = graphql(`
  mutation Initiate($input: CreateImportQueueInput!) {
    initiate(input: $input)
  }
`);
