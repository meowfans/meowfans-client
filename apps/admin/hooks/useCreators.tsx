import { GET_ALL_CREATORS_QUERY } from '@workspace/gql/api/adminAPI';
import { ExtendedUsersEntity, GetAllCreatorsOutput, SortBy } from '@workspace/gql/generated/graphql';
import { useCreatorsStore } from '@/zustand/creators.store';
import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';

interface Props {
  pageNumber: number;
  sortBy: SortBy;
}

export const useCreators = ({ pageNumber, sortBy = SortBy.UserCreatedAt }: Props) => {
  const { data, refetch } = useQuery(GET_ALL_CREATORS_QUERY, { variables: { input: { pageNumber, take: 100, sortBy } } });
  const { creators, setCreators } = useCreatorsStore();
  const { count = 0, hasNext = false, hasPrev = false, totalPages = 0 } = (data?.getCreatorsByAdmin ?? {}) as GetAllCreatorsOutput;
  const fetchedCreators = data?.getCreatorsByAdmin.creators as ExtendedUsersEntity[];

  const handleRefetch = async () => {
    await refetch({ input: { pageNumber, take: 100, sortBy } });
  };

  useEffect(() => {
    if (fetchedCreators) setCreators(fetchedCreators);
  }, [data]);

  return { count, hasNext, hasPrev, totalPages, creators, setCreators, handleRefetch };
};
