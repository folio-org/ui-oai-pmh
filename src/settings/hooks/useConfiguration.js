import { useQuery } from 'react-query';

import { useOkapiKy, useNamespace } from '@folio/stripes/core';

export const OAI_CONFIGURATION = 'OAI_CONFIGURATION';

export const useConfiguration = (name) => {
  const ky = useOkapiKy();
  const [namespaceKey] = useNamespace({ key: OAI_CONFIGURATION });

  const { data: config, isLoading: isConfigsLoading } = useQuery({
    queryKey: [namespaceKey, name],
    queryFn: () => ky.get('oai-pmh/configuration-settings', { searchParams: { name } }).json(),
    enabled: !!name,
    select: (data) => data?.configurationSettings.find(({ configName }) => name === configName),
  });

  return {
    config,
    isConfigsLoading
  };
};

