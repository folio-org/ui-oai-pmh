import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  PaneMenu,
  Button,
} from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';

import { getSetsCreateUrl } from '../../../../util';


const LastMenu = () => {
  const stripes = useStripes();
  const history = useHistory();

  const navigateToCreate = () => history.push({
    pathname: getSetsCreateUrl(),
    search: history.location.search
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

export default LastMenu;
