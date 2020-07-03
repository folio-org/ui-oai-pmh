import {
  interactor,
  isPresent,
  property,
  text,
} from '@bigtest/interactor';

import PaneHeader from '@folio/stripes-components/lib/PaneHeader/tests/interactor';
import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';
import TextField from '@folio/stripes-components/lib/TextField/tests/interactor';

import {
  TECHNICAL_FORM_NAME,
} from '../../../src/settings/constants';

export default @interactor class TechnicalInteractor {
  technicalFormPaneHeader = new PaneHeader(`#${TECHNICAL_FORM_NAME} [data-test-pane-header]`);
  technicalFormButtonSave = isPresent('[data-test-technical-form-button-save]');
  technicalFormButtonSaveDisabled = property('[data-test-technical-form-button-save]', 'disabled');
  maxRecordsPerResponse = isPresent('[data-test-max-records-per-response]');
  maxRecordsPerResponseChange = new TextField('[data-test-max-records-per-response]');
  enableValidation = isPresent('[data-test-enable-validation]');
  formattedOutput = isPresent('[data-test-formatted-output]');
  formattedOutputChange = new CheckboxInteractor('[data-test-formatted-output]');

  validationMessage = text('[role="alert"]');
  oaiNotification = isPresent('[data-test-oai-notification]');
}
