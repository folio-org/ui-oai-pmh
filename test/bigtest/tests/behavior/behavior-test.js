import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import BehaviorInteractor from '../../interactors/behavior';

import translation from '../../../../translations/ui-oai-pmh/en';

describe('Behavior settings page', () => {
  const behavior = new BehaviorInteractor();

  setupApplication();

  beforeEach(function () {
    this.visit('/settings/oai-pmh/behavior');
  });

  it('should be correct behavior title', () => {
    expect(behavior.behaviorFormPaneHeader.title).to.equal(translation['settings.behavior.title']);
  });

  it('should be presented behavior save button', () => {
    expect(behavior.behaviorFormButtonSave).to.be.true;
  });

  it('should be presented deleted records support', () => {
    expect(behavior.deletedRecordsSupport).to.be.true;
  });

  it('should be presented suppressed records processing', () => {
    expect(behavior.suppressedRecordsProcessing).to.be.true;
  });

  it('should be presented errors processing', () => {
    expect(behavior.errorsProcessing).to.be.true;
  });

  it('should be absent oai notification', () => {
    expect(behavior.oaiNotification).to.be.false;
  });

  it('should be disabled button save', () => {
    expect(behavior.behaviorFormButtonSaveDisabled).to.be.true;
  });

  describe('Save button', () => {
    beforeEach(async () => {
      await behavior.errorsProcessingChange.selectAndBlur('Associate with HTTP status 200');
    });

    it('should be enabled button save', () => {
      expect(behavior.behaviorFormButtonSaveDisabled).to.be.false;
    });
  });
});
