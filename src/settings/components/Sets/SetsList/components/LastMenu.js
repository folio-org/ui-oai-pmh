import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FormattedMessage } from 'react-intl';

import { stripesConnect } from '@folio/stripes-core';
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
  stripes,
}) => {
  const navigateToCreate = () => history.push({
    pathname: getSetsCreateUrl(),
    search: location.search
  });
  const showActionMenu = stripes.hasPerm('ui-oai-pmh.edit');

  return showActionMenu ? (
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
  ) : null;
};

LastMenu.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(stripesConnect(LastMenu));
