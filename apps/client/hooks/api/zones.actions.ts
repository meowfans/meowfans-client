import { GET_ZONE_PLANS_QUERY } from '@workspace/gql/api/zonesAPI';
import { useLazyQuery } from '@apollo/client/react';

export const useZonesActions = () => {
  const [getZonePlans] = useLazyQuery(GET_ZONE_PLANS_QUERY);

  const getZonePlansQuery = () => {
    return getZonePlans();
  };

  return { getZonePlansQuery };
};
