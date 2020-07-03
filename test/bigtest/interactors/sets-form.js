import {
  interactor,
} from '@bigtest/interactor';

import PaneHeader from '@folio/stripes-components/lib/PaneHeader/tests/interactor';

@interactor class SetsForm {
  paneHeader = new PaneHeader('[data-sets-form] [data-test-pane-header]');
}

export default new SetsForm();
