import { graphql } from '../generated';

export const ISSUE_IMPERSONATE_TOKEN_MUTATION = graphql(`
  mutation IssueImpersonationTokenMutation($creatorId: String!) {
    issueImpersonationToken(creatorId: $creatorId)
  }
`);
