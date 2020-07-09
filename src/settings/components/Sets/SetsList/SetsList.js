import React from 'react';
import {
  FormattedMessage,
} from 'react-intl';

import {
  Pane,
} from '@folio/stripes/components';

import LastMenu from './components';
import {
  FILL_PANE_WIDTH,
} from '../../../constants';

class SetsList extends React.Component {
  render() {
    return (
      <Pane
        data-sets-list
        defaultWidth={FILL_PANE_WIDTH}
        paneTitle={<FormattedMessage id="ui-oai-pmh.settings.sets.list.title" />}
        lastMenu={<LastMenu />}
      >
        <FormattedMessage id="ui-oai-pmh.settings.sets.list.title" />
      </Pane>
    );
  }
}

export default SetsList;
