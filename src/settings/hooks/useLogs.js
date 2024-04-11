import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { useNamespace } from '@folio/stripes-core';

export const OAI_LOGS = 'OAI_LOGS';

export const useLogs = () => {
  const ky = useOkapiKy();
  const [namespaceKey] = useNamespace({ key: OAI_LOGS });
  const params = new URLSearchParams({ limit: 9999 });

  const { data, isLoading } = useQuery({
    queryKey: [namespaceKey],
    queryFn: () => ky.get(`oai/request-metadata?${params}`).json()
  });

  return {
    logs: data,
    isLogsLoading: isLoading
  };
};
