import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
} from 'react-intl';

import {
  PaneFooter,
  Button,
} from '@folio/stripes/components';

import { SaveButtonTooltipWrapper } from '../../../../common';

const SetsFormPaneFooter = ({
  pristine,
  submitting,
  onSubmit,
  onBack,
  stripes,
}) => {
  const disabled = pristine || submitting;

  return (
    <PaneFooter
      renderStart={(
        <Button
          marginBottom0
          data-test-cancel-button
          id="cancel-button"
          buttonStyle="default mega"
          onClick={onBack}
        >
          <FormattedMessage id="stripes-core.button.cancel" />
        </Button>
      )}
      renderEnd={(
        <SaveButtonTooltipWrapper
          showTooltip={!stripes.hasPerm('ui-oai-pmh.edit')}
        >
          <Button
            data-test-save-button
            marginBottom0
            id="save-button"
            type="submit"
            buttonStyle="primary mega"
            disabled={disabled}
            onClick={onSubmit}
          >
            <FormattedMessage id="stripes-components.saveAndClose" />
          </Button>
        </SaveButtonTooltipWrapper>
      )}
    />
  );
};

SetsFormPaneFooter.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default SetsFormPaneFooter;
