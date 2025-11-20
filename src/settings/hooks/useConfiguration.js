import { useQuery } from 'react-query';

import { useOkapiKy, useNamespace } from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import { useIntl } from 'react-intl';
import { CALLOUT_ERROR_TYPE } from '../constants';
import { stringifyBooleansToActual } from '../util';

export const OAI_CONFIGURATION = 'OAI_CONFIGURATION';

export const useConfiguration = (name) => {
  const ky = useOkapiKy();
  const { formatMessage } = useIntl();
  const showCallout = useShowCallout();
  const [namespaceKey] = useNamespace({ key: OAI_CONFIGURATION });

  const { data: config, isLoading: isConfigsLoading } = useQuery({
    queryKey: [namespaceKey, name],
    queryFn: () => ky.get('oai-pmh/configuration-settings', { searchParams: { name } }).json(),
    enabled: !!name,
    onError: () => {
      showCallout({
        type: CALLOUT_ERROR_TYPE,
        message: formatMessage({ id: 'ui-oai-pmh.error.sww' }),
      });
    },
    select: (data) => data?.configurationSettings.find(({ configName }) => name === configName),
  });

  return {
    config: {
      ...config,
      configValue: stringifyBooleansToActual(config.configValue)
    },
    isConfigsLoading
  };
};

