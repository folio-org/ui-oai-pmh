import { useOkapiKy, useNamespace } from '@folio/stripes/core';
import { useQuery } from 'react-query';

export const SET_DETAILS = 'SET_DETAILS';

export const useSetDetails = (id) => {
  const ky = useOkapiKy();
  const [namespaceKey] = useNamespace({ key: SET_DETAILS });

  const { data: setDetails, isLoading: isSetLoading, isError } = useQuery({
    queryKey: [namespaceKey, id],
    queryFn: () => ky.get(`oai-pmh/sets/${id}`).json()
  });

  return {
    setDetails,
    isSetLoading,
    isError,
  };
};
