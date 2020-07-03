import {
  interactor,
  isPresent,
  property,
  text,
} from '@bigtest/interactor';

import PaneHeader from '@folio/stripes-components/lib/PaneHeader/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';
import TextArea from '@folio/stripes-components/lib/TextArea/tests/interactor';
import TextField from '@folio/stripes-components/lib/TextField/tests/interactor';

import {
  GENERAL_FORM_NAME,
} from '../../../src/settings/constants';

export default @interactor class GeneralInteractor {
  generalFormPaneHeader = new PaneHeader(`#${GENERAL_FORM_NAME} [data-test-pane-header]`);
  generalFormButtonSave = isPresent('[data-test-general-form-button-save]');
  generalFormButtonSaveDisabled = property('[data-test-general-form-button-save]', 'disabled');
  enableOaiService = isPresent('[data-test-enable-oai-service]');
  repositoryName = isPresent('[data-test-repository-name]');
  baseUrl = isPresent('[data-test-base-url]');
  baseUrlChange = new TextField('[data-test-base-url]');
  timeGranularity = isPresent('[data-test-time-granularity]');
  timeGranularityChange = new SelectInteractor('[data-test-time-granularity]');
  administratorEmail = isPresent('[data-test-administrator-email]');
  administratorEmailChange = new TextArea('[data-test-administrator-email]');

  validationMessage = text('[role="alert"]');
  oaiNotification = isPresent('[data-test-oai-notification]');
}
