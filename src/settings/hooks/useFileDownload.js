import { useQuery } from 'react-query';

import { useOkapiKy, useNamespace } from '@folio/stripes/core';


export const QUERY_KEY_DOWNLOAD_LOGS = 'QUERY_KEY_DOWNLOAD_LOGS';

export const useFileDownload = ({
  id,
  onSuccess,
  onSettled,
}) => {
  const ky = useOkapiKy();
  const [namespaceKey] = useNamespace({ key: QUERY_KEY_DOWNLOAD_LOGS });

  const { refetch } = useQuery(
    {
      queryKey: [namespaceKey, id],
      queryFn: () => ky.get(`oai/request-metadata/${id}/logs`).blob(),
      enabled: false,
      onSuccess,
      onSettled
    },
  );

  return { refetch };
};
