import { FormattedMessage } from 'react-intl';

export const LOGS_COLUMNS = [
  {
    label: <FormattedMessage id="ui-oai-pmh.settings.logs.columns.started" />,
    value: 'startedDate',
  },
  {
    label: <FormattedMessage id="ui-oai-pmh.settings.logs.columns.lastUpdate" />,
    value: 'lastUpdatedDate',
  },
  {
    label: <FormattedMessage id="ui-oai-pmh.settings.logs.columns.harvestId" />,
    value: 'requestId',
  },
  {
    label: '',
    value: 'linkToErrorFile',
  }
];
