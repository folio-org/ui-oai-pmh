import {
  collection,
  text,
  isPresent,
  interactor,
  Interactor,
} from '@bigtest/interactor';

import PaneHeader from '@folio/stripes-components/lib/PaneHeader/tests/interactor';
import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';
import ExpandAllButtonInteractor from '@folio/stripes-components/lib/Accordion/tests/expand-all-button-interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';
import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import TextAreaInteractor from '@folio/stripes-components/lib/TextArea/tests/interactor';
import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';
import MessageBanner from '@folio/stripes-components/lib/MessageBanner/tests/interactor';
import CalloutInteractor from '@folio/stripes-components/lib/Callout/tests/interactor';

@interactor class SetsForm {
  isLoaded = isPresent('[data-test-set-filtering-conditions-row-active]');

  paneHeader = new PaneHeader('[data-test-sets-form] [data-test-pane-header]');
  navigateBackConfirmationModal = new Interactor('#cancel-editing-confirmation');
  clickCancelNavigationButton = new ButtonInteractor('#clickable-cancel-editing-confirmation-cancel');
  clickContinueNavigationButton = new ButtonInteractor('#clickable-cancel-editing-confirmation-confirm');

  expandAllButton = new ExpandAllButtonInteractor('[data-test-sets-form] [data-test-expand-all-button]');

  name = new TextFieldInteractor('[data-test-set-fields-name]');
  description = new TextAreaInteractor('[data-test-set-fields-description]');
  setSpecLabel = text('[data-test-set-fields-set-specification] [data-test-set-fields-set-specification-label]');
  setSpecText = text('[data-test-set-fields-set-specification] [data-test-set-fields-set-specification-text]');

  filteringConditionsTitleName = text('[data-test-filtering-conditions-title-name]');
  filteringConditionsTitleActive = text('[data-test-filtering-conditions-title-active]');
  filteringConditionsTitleValue = text('[data-test-filtering-conditions-title-value]');
  filteringConditionsTitleSetSpec = text('[data-test-filtering-conditions-title-set-spec]');

  filteringConditionsRow = collection('[data-test-set-filtering-conditions-row]', {
    name: text('[data-test-set-filtering-conditions-row-name]'),
    active: new CheckboxInteractor('[data-test-set-filtering-conditions-row-active]'),
    value: new SelectInteractor('[data-test-set-filtering-conditions-row-value]'),
    setSpec: new TextFieldInteractor('[data-test-set-filtering-conditions-row-set-spec]'),
  });

  paneHeaderCancelButton = new ButtonInteractor('[data-test-cancel-button]');
  paneHeaderSaveButton = new ButtonInteractor('[data-test-save-button]');

  paneHeaderSetNotFound = new PaneHeader('[data-test-sets-not-found] [data-test-pane-header]');
  setNotFoundMessageBanner = new MessageBanner();

  callout = new CalloutInteractor();

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }
}

export default new SetsForm();
