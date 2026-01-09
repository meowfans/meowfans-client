import { useLazyQuery } from '@apollo/client/react';
import { GET_ZONE_PLANS_QUERY } from '@workspace/gql/api';

export const useZonesActions = () => {
  const [getZonePlans] = useLazyQuery(GET_ZONE_PLANS_QUERY);

  const getZonePlansQuery = () => {
    return getZonePlans();
  };

  return { getZonePlansQuery };
};
