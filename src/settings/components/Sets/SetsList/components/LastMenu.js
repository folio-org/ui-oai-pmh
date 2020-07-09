import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FormattedMessage } from 'react-intl';

import {
  PaneMenu,
  Button,
} from '@folio/stripes/components';

import {
  getSetsCreateUrl,
} from '../../../../util';

const LastMenu = ({
  history,
  location,
}) => {
  const navigateToCreate = () => history.push({
    pathname: getSetsCreateUrl(),
    search: location.search
  });

  return (
    <PaneMenu>
      <FormattedMessage id="stripes-smart-components.addNew">
        {ariaLabel => (
          <Button
            data-test-add-new-set-button
            aria-label={ariaLabel}
            onClick={navigateToCreate}
            buttonStyle="primary"
            marginBottom0
          >
            <FormattedMessage id="stripes-smart-components.new" />
          </Button>
        )}
      </FormattedMessage>
    </PaneMenu>
  );
};

LastMenu.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(LastMenu);
