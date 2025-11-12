import { useMutation, useQueryClient } from 'react-query';

import { useOkapiKy, useNamespace } from '@folio/stripes/core';

import { OAI_CONFIGURATIONS } from './constants';

export const useCreateConfiguration = () => {
  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const [namespaceKey] = useNamespace({ key: OAI_CONFIGURATIONS });

  const { mutate } = useMutation({
    mutationFn: (configData) => ky.post('oai-pmh/configuration-settings', { json: configData }).json(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [namespaceKey] });
    }
  });

  return { createConfiguration: mutate };
};

