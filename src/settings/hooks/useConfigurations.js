import { useOkapiKy, useNamespace } from '@folio/stripes/core';
import { useQuery } from 'react-query';

export const OAI_CONFIGURATIONS = 'OAI_CONFIGURATIONS';

export const useConfigurations = ({
  module,
  configName
}) => {
  const ky = useOkapiKy();
  const [namespaceKey] = useNamespace({ key: OAI_CONFIGURATIONS });
  const params = new URLSearchParams({ query: `(module=${module} and configName=${configName})` });

  const { data, isLoading: isConfigurationLoading } = useQuery({
    queryKey: [namespaceKey, module, configName],
    queryFn: () => ky.get(`configurations/entries?${params}`).json()
  });

  return {
    configs: data?.configs || [],
    isConfigurationLoading
  };
};
