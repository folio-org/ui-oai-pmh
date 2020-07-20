import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import GeneralInteractor from '../../interactors/general';
import translation from '../../../../translations/ui-oai-pmh/en';

describe('General settings page', () => {
  const general = new GeneralInteractor();

  setupApplication();

  beforeEach(function () {
    this.visit('/settings/oai-pmh/general');
  });

  it('should be correct general title', () => {
    expect(general.generalFormPaneHeader.title).to.equal(translation['settings.general.title']);
  });

  it('should be presented general save button', () => {
    expect(general.generalFormButtonSave).to.be.true;
  });

  it('should be presented enable oai service', () => {
    expect(general.enableOaiService).to.be.true;
  });

  it('should be presented repository name', () => {
    expect(general.repositoryName).to.be.true;
  });

  it('should be presented base url', () => {
    expect(general.baseUrl).to.be.true;
  });

  it('should be presented time granularity', () => {
    expect(general.timeGranularity).to.be.true;
  });

  it('should be presented administrator email', () => {
    expect(general.administratorEmail).to.be.true;
  });

  it('should be absent oai notification', () => {
    expect(general.oaiNotification).to.be.false;
  });

  it('should be disabled button save', () => {
    expect(general.generalFormButtonSaveDisabled).to.be.true;
  });

  describe('Save button', () => {
    beforeEach(async () => {
      await general.timeGranularityChange.selectAndBlur('YYYY-MM-DDThh:mm:ssZ');
    });

    it('should be enabled button save', () => {
      expect(general.generalFormButtonSaveDisabled).to.be.false;
    });
  });

  describe('Validate', () => {
    beforeEach(async () => {
      await general.administratorEmailChange.fillAndBlur('test@test.com');
      await general.baseUrlChange.fillAndBlur('http://test.com');
    });

    it('should be enabled button save', () => {
      expect(general.validationMessage).to.equal('');
    });
  });
});
