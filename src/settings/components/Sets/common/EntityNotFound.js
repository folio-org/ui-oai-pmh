import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Pane,
  MessageBanner,
} from '@folio/stripes/components';

const EntityNotFound = ({
  pageTitleTranslationKey,
  errorTextTranslationKey,
  paneWidth,
  onBack,
}) => (
  <Pane
    data-test-sets-not-found
    defaultWidth={paneWidth}
    paneTitle={<FormattedMessage id={pageTitleTranslationKey} />}
    dismissible
    onClose={onBack}
  >
    <MessageBanner type="error">
      <FormattedMessage id={errorTextTranslationKey} />
    </MessageBanner>
  </Pane>
);

EntityNotFound.propTypes = {
  pageTitleTranslationKey: PropTypes.string.isRequired,
  errorTextTranslationKey: PropTypes.string.isRequired,
  paneWidth: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default EntityNotFound;
