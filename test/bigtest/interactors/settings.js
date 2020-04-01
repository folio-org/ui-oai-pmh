import {
  interactor,
  isPresent,
} from '@bigtest/interactor';

export default @interactor class SettingsInteractor {
  behaviorFormButtonSave = isPresent('[data-test-behavior-form-button-save]');
  deletedRecordsSupport = isPresent('[data-test-deleted-records-support]');
  suppressedRecordsProcessing = isPresent('[data-test-suppressed-records-processing]');
  errorsProcessing = isPresent('[data-test-errors-processing]');

  generalFormButtonSave = isPresent('[data-test-general-form-button-save]');
  enableOaiService = isPresent('[data-test-enable-oai-service]');
  repositoryName = isPresent('[data-test-repository-name]');
  baseUrl = isPresent('[data-test-base-url]');
  timeGranularity = isPresent('[data-test-time-granularity]');
  administratorEmail = isPresent('[data-test-administrator-email]');

  technicalFormButtonSave = isPresent('[data-test-technical-form-button-save]');
  maxRecordsPerResponse = isPresent('[data-test-max-records-per-response]');
  enableValidation = isPresent('[data-test-enable-validation]');
  formattedOutput = isPresent('[data-test-formatted-output]');
}
