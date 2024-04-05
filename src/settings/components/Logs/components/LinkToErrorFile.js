import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { saveAs } from 'file-saver';

import { Button, Icon } from '@folio/stripes/components';

import { useFileDownload } from '../../../hooks/useFileDownload';

export const LinkToErrorFile = ({ linkToErrorFile, requestId }) => {
  const { refetch } = useFileDownload({
    id: requestId,
    onSuccess: data => {
      saveAs(new Blob([data]), linkToErrorFile);
    },
  });

  return linkToErrorFile && (
    <Button onClick={refetch} marginBottom0>
      <Icon
        icon="download"
        iconPosition="end"
      >
        <FormattedMessage id="ui-oai-pmh.settings.logs.download" />
      </Icon>
    </Button>
  );
};

LinkToErrorFile.propTypes = {
  linkToErrorFile: PropTypes.string,
  requestId: PropTypes.string,
};
