import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  omit,
} from 'lodash';

import { Button, Tooltip } from '@folio/stripes/components';

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
      <div>
        <div
          id="save-button-tooltip-content"
          name="save-button-tooltip-content"
          aria-labelledby="save-button-tooltip-text"
          ref={this.saveButton}
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
        </div>
        {showTooltip &&
          <Tooltip
            id="save-button-tooltip"
            name="save-button-tooltip"
            text={<FormattedMessage id="ui-oai-pmh.settings.all.saveButton.lackPermissions" />}
            triggerRef={this.saveButton}
          />
        }
      </div>
    );
  }
}

export default SaveButton;
