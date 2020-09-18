import {
  interactor,
  isPresent,
} from '@bigtest/interactor';

import PaneHeader from '@folio/stripes-components/lib/PaneHeader/tests/interactor';
import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';
import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';

@interactor class SetsList {
  isLoaded = isPresent('#setList');

  paneHeader = new PaneHeader('[data-test-sets-list] [data-test-pane-header]');

  newSetButton = new ButtonInteractor('[data-test-add-new-set-button]');

  setsList = new MultiColumnListInteractor('#setList');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }
}

export default new SetsList();
