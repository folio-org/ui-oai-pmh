import { useQuery } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';

export const QUERY_KEY_DOWNLOAD_LOGS = 'QUERY_KEY_DOWNLOAD_LOGS';

export const useFileDownload = ({
  id,
  onSuccess,
  onSettled,
}) => {
  const ky = useOkapiKy();

  const { refetch } = useQuery(
    {
      queryKey: [QUERY_KEY_DOWNLOAD_LOGS, id],
      queryFn: () => ky.get(`oai/request-metadata/${id}/logs`).blob(),
      enabled: false,
      onSuccess,
      onSettled
    },
  );

  return { refetch };
};
