import { useQuery } from 'react-query';

import { useOkapiKy, useNamespace } from '@folio/stripes/core';

export const OAI_CONFIGURATION = 'OAI_CONFIGURATION';

export const useConfiguration = (configName) => {
  const ky = useOkapiKy();
  const [namespaceKey] = useNamespace({ key: OAI_CONFIGURATION });

  const { data: config, isLoading: isConfigsLoading } = useQuery({
    queryKey: [namespaceKey, configName],
    queryFn: () => ky.get('oai-pmh/configuration-settings', { searchParams: { configName } }).json(),
    enabled: !!configName,
    select: (data) => data.configurations.find(({ configName: name }) => name === configName),
  });

  return {
    config,
    isConfigsLoading
  };
};

