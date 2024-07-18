import { useOkapiKy, useNamespace } from '@folio/stripes/core';
import { useQuery } from 'react-query';

export const FILTERING_CONDITIONS = 'FILTERING_CONDITIONS';

export const useFilteringConditions = ({
  onSuccess,
  onError
}) => {
  const ky = useOkapiKy();
  const [namespaceKey] = useNamespace({ key: FILTERING_CONDITIONS });

  const { data, isLoading: isFilteringConditionsLoading } = useQuery({
    queryKey: [namespaceKey],
    queryFn: () => ky.get('oai-pmh/filtering-conditions').json(),
    onSuccess,
    onError,
  });

  return {
    conditions: data?.setsFilteringConditions || [],
    isFilteringConditionsLoading
  };
};
