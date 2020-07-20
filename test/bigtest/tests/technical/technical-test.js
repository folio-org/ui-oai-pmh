import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import TechnicalInteractor from '../../interactors/technical';
import translation from '../../../../translations/ui-oai-pmh/en';

describe('Technical settings page', () => {
  const technical = new TechnicalInteractor();

  setupApplication();

  beforeEach(function () {
    this.visit('/settings/oai-pmh/technical');
  });

  it('should be correct technical title', () => {
    expect(technical.technicalFormPaneHeader.title).to.equal(translation['settings.technical.title']);
  });

  it('should be presented technical save button', () => {
    expect(technical.technicalFormButtonSave).to.be.true;
  });

  it('should be presented max records per response', () => {
    expect(technical.maxRecordsPerResponse).to.be.true;
  });

  it('should be presented enable validation', () => {
    expect(technical.enableValidation).to.be.true;
  });

  it('should be presented formatted output', () => {
    expect(technical.formattedOutput).to.be.true;
  });

  it('should be absent oai notification', () => {
    expect(technical.oaiNotification).to.be.false;
  });

  it('should be disabled button save', () => {
    expect(technical.technicalFormButtonSaveDisabled).to.be.true;
  });

  describe('Save button', () => {
    beforeEach(async () => {
      await technical.formattedOutputChange.clickAndBlur();
    });

    it('should be enabled button save', () => {
      expect(technical.technicalFormButtonSaveDisabled).to.be.false;
    });
  });

  describe('Validate', () => {
    beforeEach(async () => {
      await technical.maxRecordsPerResponseChange.fillAndBlur('50');
    });

    it('should be enabled button save', () => {
      expect(technical.validationMessage).to.equal('');
    });
  });
});
