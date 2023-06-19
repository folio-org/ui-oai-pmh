import {
  FolioFormattedTime,
} from '@folio/stripes-acq-components';
import React from 'react';
import { TextLink } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

export const logsFormatter = {
  startedDate: ({ startedDate }) => <FolioFormattedTime dateString={startedDate} />,
  lastUpdatedDate: ({ lastUpdatedDate }) => <FolioFormattedTime dateString={lastUpdatedDate} />,
  linkToErrorFile: ({ linkToErrorFile }) => linkToErrorFile && (
    <TextLink href={linkToErrorFile}>
      <FormattedMessage id="ui-oai-pmh.settings.logs.download" />
    </TextLink>
  )
};
