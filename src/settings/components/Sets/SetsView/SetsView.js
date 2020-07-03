import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Pane,
} from '@folio/stripes/components';

import {
  FILL_PANE_WIDTH,
} from '../../../constants';

class SetsView extends React.Component {
  render() {
    return (
      <Pane
        data-sets-view
        defaultWidth={FILL_PANE_WIDTH}
        paneTitle={<FormattedMessage id="ui-oai-pmh.settings.sets.view.title" />}
      >
        <FormattedMessage id="ui-oai-pmh.settings.sets.view.title" />
      </Pane>
    );
  }
}

export default SetsView;
