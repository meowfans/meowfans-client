import { graphql } from '../generated';

export const GET_ZONE_PLANS_QUERY = graphql(`
  query GetZonePlans {
    getZonePlans {
      id
      unlockPrice
      zoneType
    }
  }
`);
