import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { omit } from 'lodash';

import { Button } from '@folio/stripes/components';

import SaveButtonTooltipWrapper from './SaveButtonTooltipWrapper';


const SaveButton = ({ disabled, showTooltip, ...props }) => {
  const saveButton = useRef(null);
  const dataTest = omit(props, ['disabled', 'showTooltip']);

  return (
    <SaveButtonTooltipWrapper showTooltip={showTooltip}>
      <Button
        {...dataTest}
        ref={saveButton}
        type="submit"
        buttonStyle="primary paneHeaderNewButton"
        marginBottom0
        disabled={disabled}
      >
        <FormattedMessage id="stripes-core.button.save" />
      </Button>
    </SaveButtonTooltipWrapper>
  );
};

SaveButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  showTooltip: PropTypes.bool.isRequired,
};

export default SaveButton;
