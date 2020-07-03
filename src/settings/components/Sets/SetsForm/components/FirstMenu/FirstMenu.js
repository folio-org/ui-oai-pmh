import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  PaneHeaderIconButton,
  PaneMenu
} from '@folio/stripes/components';

const FirstMenu = ({
  onClickHandler,
}) => (
  <PaneMenu>
    <FormattedMessage id="ui-oai-pmh.settings.sets.form.button.cancel">
      {ariaLabel => (
        <PaneHeaderIconButton
          data-test-pane-header-dismiss-button
          id="sets-form-button-cancel"
          icon="times"
          ariaLabel={ariaLabel}
          onClick={onClickHandler}
        />
      )}
    </FormattedMessage>
  </PaneMenu>
);

FirstMenu.propTypes = {
  onClickHandler: PropTypes.func.isRequired
};

export default FirstMenu;
