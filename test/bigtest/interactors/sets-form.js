import {
  clickable,
  interactor,
  Interactor,
} from '@bigtest/interactor';

import PaneHeader from '@folio/stripes-components/lib/PaneHeader/tests/interactor';
import ExpandAllButtonInteractor from '@folio/stripes-components/lib/Accordion/tests/expand-all-button-interactor';
import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import TextAreaInteractor from '@folio/stripes-components/lib/TextArea/tests/interactor';
import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';
import MessageBanner from '@folio/stripes-components/lib/MessageBanner/tests/interactor';
import CalloutInteractor from '@folio/stripes-components/lib/Callout/tests/interactor';

@interactor class SetsForm {
  paneHeader = new PaneHeader('[data-sets-form] [data-test-pane-header]');
  navigateBackConfirmationModal = new Interactor('#cancel-editing-confirmation');
  clickCancelNavigationButton = clickable('#clickable-cancel-editing-confirmation-cancel');
  clickContinueNavigationButton = clickable('#clickable-cancel-editing-confirmation-confirm');

  expandAllButton = new ExpandAllButtonInteractor('[data-sets-form] [data-test-expand-all-button]');

  name = new TextFieldInteractor('[data-test-set-fields-name]');
  description = new TextAreaInteractor('[data-test-set-fields-description]');

  paneHeaderCancelButton = new ButtonInteractor('[data-test-cancel-button]');
  paneHeaderSaveButton = new ButtonInteractor('[data-test-save-button]');

  paneHeaderSetNotFound = new PaneHeader('[data-sets-not-found] [data-test-pane-header]');
  setNotFoundMessageBanner = new MessageBanner();

  callout = new CalloutInteractor();
}

export default new SetsForm();
