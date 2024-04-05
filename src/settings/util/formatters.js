import React from 'react';

import { FolioFormattedTime } from '@folio/stripes-acq-components';

import { LinkToErrorFile } from '../components/Logs/components/LinkToErrorFile';

export const logsFormatter = {
  startedDate: ({ startedDate }) => <FolioFormattedTime dateString={startedDate} />,
  lastUpdatedDate: ({ lastUpdatedDate }) => <FolioFormattedTime dateString={lastUpdatedDate} />,
  linkToErrorFile: ({ linkToErrorFile, requestId }) => <LinkToErrorFile linkToErrorFile={linkToErrorFile} requestId={requestId} />,
};
