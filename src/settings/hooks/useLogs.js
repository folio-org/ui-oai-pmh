import { useOkapiKy } from '@folio/stripes-core';
import { useQuery } from 'react-query';

export const useLogs = () => {
  const ky = useOkapiKy();
  const params = new URLSearchParams({ limit: 9999 });

  const { data, isLoading } = useQuery({
    queryKey: 'oaiLogs',
    queryFn: () => ky.get(`oai/request-metadata?${params}`).json()
  });

  return {
    logs: data,
    isLogsLoading: isLoading
  };
};
