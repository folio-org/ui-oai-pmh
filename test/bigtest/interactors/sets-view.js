import {
  interactor,
} from '@bigtest/interactor';

import PaneHeader from '@folio/stripes-components/lib/PaneHeader/tests/interactor';
import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';
import ConfirmationModalInteractor from '@folio/stripes-components/lib/ConfirmationModal/tests/interactor';
import CalloutInteractor from '@folio/stripes-components/lib/Callout/tests/interactor';

@interactor class SetsView {
  paneHeader = new PaneHeader('[data-sets-view] [data-test-pane-header]');

  editButton = new ButtonInteractor('#editSetAction');
  duplicateButton = new ButtonInteractor('#duplicateSetAction');
  deleteButton = new ButtonInteractor('#deleteSetAction');

  confirmDeleteSetsModal = new ConfirmationModalInteractor('#confirm-delete-sets-modal');

  callout = new CalloutInteractor();
}

export default new SetsView();
