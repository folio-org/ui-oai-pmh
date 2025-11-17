import { useMutation, useQueryClient } from 'react-query';
import { useIntl } from 'react-intl';

import { useOkapiKy, useNamespace } from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import { OAI_CONFIGURATION } from './useConfiguration';
import { CALLOUT_ERROR_TYPE } from '../constants';

export const useUpdateConfiguration = (id, configName) => {
  const ky = useOkapiKy();
  const { formatMessage } = useIntl();
  const showCallout = useShowCallout();
  const queryClient = useQueryClient();
  const [namespaceKey] = useNamespace({ key: OAI_CONFIGURATION });

  const { mutate } = useMutation({
    mutationFn: (configData) => ky.put(`oai-pmh/configuration-settings/${id}`, { json: configData }).json(),
    onSuccess: () => {
      showCallout({
        message: formatMessage({ id: 'ui-oai-pmh.settings.configuration.update.success' }),
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [namespaceKey, configName] });
    },
    onError: (err) => {
      console.error('configuration update failed', err); // eslint-disable-line no-console
      showCallout({
        type: CALLOUT_ERROR_TYPE,
        message: formatMessage({ id: 'ui-oai-pmh.error.sww' }),
      });
    },
  });

  return { updateConfiguration: mutate };
};

