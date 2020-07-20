import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  omit,
} from 'lodash';

import {
  Button,
} from '@folio/stripes/components';

import SaveButtonTooltipWrapper from './SaveButtonTooltipWrapper';

class SaveButton extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    showTooltip: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.saveButton = React.createRef();
  }

  render() {
    const {
      disabled,
      showTooltip,
    } = this.props;
    const dataTest = omit(this.props, ['disabled', 'showTooltip']);

    return (
      <SaveButtonTooltipWrapper
        showTooltip={showTooltip}
      >
        <Button
          {...dataTest}
          type="submit"
          buttonStyle="primary paneHeaderNewButton"
          marginBottom0
          disabled={disabled}
        >
          <FormattedMessage id="stripes-core.button.save" />
        </Button>
      </SaveButtonTooltipWrapper>
    );
  }
}

export default SaveButton;
