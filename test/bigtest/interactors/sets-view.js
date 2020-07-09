import {
  interactor,
} from '@bigtest/interactor';

import PaneHeader from '@folio/stripes-components/lib/PaneHeader/tests/interactor';

@interactor class SetsView {
  paneHeader = new PaneHeader('[data-sets-view] [data-test-pane-header]');
}

export default new SetsView();
