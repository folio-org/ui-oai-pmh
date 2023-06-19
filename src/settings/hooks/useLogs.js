import { useOkapiKy } from '@folio/stripes-core';
import { useQuery } from 'react-query';

export const useLogs = () => {
  const ky = useOkapiKy();

  const { data, isLoading } = useQuery({
    queryKey: 'oaiLogs',
    queryFn: () => ky.get('oai/request-metadata').json()
  });

  return {
    logs: data,
    isLogsLoading: isLoading
  };
};
