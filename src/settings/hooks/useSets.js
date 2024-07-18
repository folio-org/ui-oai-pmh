import { useOkapiKy, useNamespace } from '@folio/stripes/core';
import { useInfiniteQuery } from 'react-query';
import { PAGE_AMOUNT } from '../constants';

export const SETS = 'SETS';

export const useSets = ({
  offset,
  onSuccess,
  onError
}) => {
  const ky = useOkapiKy();
  const [namespaceKey] = useNamespace({ key: SETS });

  const { data, isLoading: isSetsLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [SETS, namespaceKey],
    queryFn: ({ pageParam = 0 }) => {
      const params = new URLSearchParams({ offset: pageParam, limit: PAGE_AMOUNT });

      return ky.get(`oai-pmh/sets?${params}`).json();
    },
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.flatMap((page) => page.sets).length < lastPage.totalRecords) {
        return offset + PAGE_AMOUNT;
      }

      return undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => allPages.length,
    onSuccess,
    onError,
  });

  const sets = data?.pages.flatMap((page) => page.sets) || [];
  const totalRecords = data?.totalRecords || 0;

  return {
    sets,
    totalRecords,
    isSetsLoading,
    fetchNextPage,
    hasNextPage,
  };
};
