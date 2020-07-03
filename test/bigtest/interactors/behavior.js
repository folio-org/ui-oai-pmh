import {
  interactor,
  isPresent,
  property,
  text,
} from '@bigtest/interactor';

import PaneHeader from '@folio/stripes-components/lib/PaneHeader/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';

import {
  BEHAVIOR_FORM_NAME,
} from '../../../src/settings/constants';

export default @interactor class BehaviorInteractor {
  behaviorFormPaneHeader = new PaneHeader(`#${BEHAVIOR_FORM_NAME} [data-test-pane-header]`);
  behaviorFormButtonSave = isPresent('[data-test-behavior-form-button-save]');
  behaviorFormButtonSaveDisabled = property('[data-test-behavior-form-button-save]', 'disabled');
  deletedRecordsSupport = isPresent('[data-test-deleted-records-support]');
  suppressedRecordsProcessing = isPresent('[data-test-suppressed-records-processing]');
  errorsProcessing = isPresent('[data-test-errors-processing]');
  errorsProcessingChange = new SelectInteractor('[data-test-errors-processing]');

  validationMessage = text('[role="alert"]');
  oaiNotification = isPresent('[data-test-oai-notification]');
}
