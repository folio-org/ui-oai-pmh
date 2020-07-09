import {
  interactor,
} from '@bigtest/interactor';

import PaneHeader from '@folio/stripes-components/lib/PaneHeader/tests/interactor';
import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';

@interactor class SetsList {
  paneHeader = new PaneHeader('[data-sets-list] [data-test-pane-header]');

  newSetButton = new ButtonInteractor('[data-test-add-new-set-button]');
}

export default new SetsList();
