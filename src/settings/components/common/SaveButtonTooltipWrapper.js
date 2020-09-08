import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Tooltip,
} from '@folio/stripes/components';

class SaveButton extends React.Component {
  static propTypes = {
    showTooltip: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.saveButton = React.createRef();
  }

  render() {
    const {
      showTooltip,
      children,
    } = this.props;
    const ariaLabelledby = showTooltip ? { 'aria-labelledby': 'save-button-tooltip-text' } : {};

    return (
      <>
        <div
          id="save-button-tooltip-content"
          name="save-button-tooltip-content"
          {...ariaLabelledby}
          ref={this.saveButton}
        >
          {children}
        </div>
        {showTooltip &&
        <Tooltip
          id="save-button-tooltip"
          name="save-button-tooltip"
          text={<FormattedMessage id="ui-oai-pmh.settings.all.saveButton.lackPermissions" />}
          triggerRef={this.saveButton}
        />
        }
      </>
    );
  }
}

export default SaveButton;
