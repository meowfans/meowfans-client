import { graphql } from '../generated';

export const GET_TAGS_QUERY = graphql(`
  query GetPublicTags($input: PaginationInput!) {
    getPublicTags(input: $input) {
      id
      label
    }
  }
`);

export const SEARCH_TAGS_QUERY = graphql(`
  query SearchTags($input: PaginationInput!) {
    searchTags(input: $input) {
      id
      label
    }
  }
`);
