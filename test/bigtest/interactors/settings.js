import {
  interactor,
  isPresent,
  property,
} from '@bigtest/interactor';

import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';
import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';

export default @interactor class SettingsInteractor {
  behaviorFormButtonSave = isPresent('[data-test-behavior-form-button-save]');
  behaviorFormButtonSaveDisabled = property('[data-test-behavior-form-button-save]', 'disabled');
  deletedRecordsSupport = isPresent('[data-test-deleted-records-support]');
  suppressedRecordsProcessing = isPresent('[data-test-suppressed-records-processing]');
  errorsProcessing = isPresent('[data-test-errors-processing]');
  errorsProcessingChange = new SelectInteractor('[data-test-errors-processing]');

  generalFormButtonSave = isPresent('[data-test-general-form-button-save]');
  generalFormButtonSaveDisabled = property('[data-test-general-form-button-save]', 'disabled');
  enableOaiService = isPresent('[data-test-enable-oai-service]');
  repositoryName = isPresent('[data-test-repository-name]');
  baseUrl = isPresent('[data-test-base-url]');
  timeGranularity = isPresent('[data-test-time-granularity]');
  timeGranularityChange = new SelectInteractor('[data-test-time-granularity]');
  administratorEmail = isPresent('[data-test-administrator-email]');

  technicalFormButtonSave = isPresent('[data-test-technical-form-button-save]');
  technicalFormButtonSaveDisabled = property('[data-test-technical-form-button-save]', 'disabled');
  maxRecordsPerResponse = isPresent('[data-test-max-records-per-response]');
  enableValidation = isPresent('[data-test-enable-validation]');
  formattedOutput = isPresent('[data-test-formatted-output]');
  formattedOutputChange = new CheckboxInteractor('[data-test-formatted-output]');

  oaiNotification = isPresent('[data-test-oai-notification]');
}
