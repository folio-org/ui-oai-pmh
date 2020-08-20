import {
  interactor,
  text,
} from '@bigtest/interactor';

import PaneHeader from '@folio/stripes-components/lib/PaneHeader/tests/interactor';
import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';
import ConfirmationModalInteractor from '@folio/stripes-components/lib/ConfirmationModal/tests/interactor';
import CalloutInteractor from '@folio/stripes-components/lib/Callout/tests/interactor';
import ExpandAllButtonInteractor from '@folio/stripes-components/lib/Accordion/tests/expand-all-button-interactor';
import KeyValueInteractor from '@folio/stripes-components/lib/KeyValue/tests/interactor';
import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';

@interactor class SetsView {
  paneHeader = new PaneHeader('[data-sets-view] [data-test-pane-header]');

  editButton = new ButtonInteractor('#editSetAction');
  duplicateButton = new ButtonInteractor('#duplicateSetAction');
  deleteButton = new ButtonInteractor('#deleteSetAction');

  confirmDeleteSetsModal = new ConfirmationModalInteractor('#confirm-delete-sets-modal');

  expandAllButton = new ExpandAllButtonInteractor('[data-sets-view] [data-test-expand-all-button]');

  headline = text('[data-test-sets-view-headline]');
  name = new KeyValueInteractor('[data-test-set-view-fields-name]');
  description = new KeyValueInteractor('[data-test-set-view-fields-description]');
  setSpec = new KeyValueInteractor('[data-test-set-view-fields-set-spec]');

  filteringConditionsList = new MultiColumnListInteractor('#viewFilteringConditions');

  callout = new CalloutInteractor();
}

export default new SetsView();
