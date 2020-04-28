import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SettingsInteractor from '../interactors/settings';

describe('Settings', () => {
  const settings = new SettingsInteractor();

  describe('With enabled OAI service', () => {
    setupApplication();

    describe('Behavior settings page', () => {
      beforeEach(function () {
        this.visit('/settings/oaipmh/behavior');
      });

      it('should be presented behavior save button', () => {
        expect(settings.behaviorFormButtonSave).to.be.true;
      });

      it('should be presented deleted records support', () => {
        expect(settings.deletedRecordsSupport).to.be.true;
      });

      it('should be presented suppressed records processing', () => {
        expect(settings.suppressedRecordsProcessing).to.be.true;
      });

      it('should be presented errors processing', () => {
        expect(settings.errorsProcessing).to.be.true;
      });

      it('should be absent oai notification', () => {
        expect(settings.oaiNotification).to.be.false;
      });

      it('should be disabled button save', () => {
        expect(settings.behaviorFormButtonSaveDisabled).to.be.true;
      });

      describe('Save button', () => {
        beforeEach(async () => {
          await settings.errorsProcessingChange.selectAndBlur('Associate with HTTP status 200');
        });

        it('should be enabled button save', () => {
          expect(settings.behaviorFormButtonSaveDisabled).to.be.false;
        });
      });
    });

    describe('General settings page', () => {
      beforeEach(function () {
        this.visit('/settings/oaipmh/general');
      });

      it('should be presented general save button', () => {
        expect(settings.generalFormButtonSave).to.be.true;
      });

      it('should be presented enable oai service', () => {
        expect(settings.enableOaiService).to.be.true;
      });

      it('should be presented repository name', () => {
        expect(settings.repositoryName).to.be.true;
      });

      it('should be presented base url', () => {
        expect(settings.baseUrl).to.be.true;
      });

      it('should be presented time granularity', () => {
        expect(settings.timeGranularity).to.be.true;
      });

      it('should be presented administrator email', () => {
        expect(settings.administratorEmail).to.be.true;
      });

      it('should be absent oai notification', () => {
        expect(settings.oaiNotification).to.be.false;
      });

      it('should be disabled button save', () => {
        expect(settings.generalFormButtonSaveDisabled).to.be.true;
      });

      describe('Save button', () => {
        beforeEach(async () => {
          await settings.timeGranularityChange.selectAndBlur('YYYY-MM-DDThh:mm:ssZ');
        });

        it('should be enabled button save', () => {
          expect(settings.generalFormButtonSaveDisabled).to.be.false;
        });
      });

      describe('Validate', () => {
        beforeEach(async () => {
          await settings.administratorEmailChange.fillAndBlur('test@test.com');
          await settings.baseUrlChange.fillAndBlur('http://test.com');
        });

        it('should be enabled button save', () => {
          expect(settings.validationMessage).to.equal('');
        });
      });
    });

    describe('Technical settings page', () => {
      beforeEach(function () {
        this.visit('/settings/oaipmh/technical');
      });

      it('should be presented technical save button', () => {
        expect(settings.technicalFormButtonSave).to.be.true;
      });

      it('should be presented max records per response', () => {
        expect(settings.maxRecordsPerResponse).to.be.true;
      });

      it('should be presented enable validation', () => {
        expect(settings.enableValidation).to.be.true;
      });

      it('should be presented formatted output', () => {
        expect(settings.formattedOutput).to.be.true;
      });

      it('should be absent oai notification', () => {
        expect(settings.oaiNotification).to.be.false;
      });

      it('should be disabled button save', () => {
        expect(settings.technicalFormButtonSaveDisabled).to.be.true;
      });

      describe('Save button', () => {
        beforeEach(async () => {
          await settings.formattedOutputChange.clickAndBlur();
        });

        it('should be enabled button save', () => {
          expect(settings.technicalFormButtonSaveDisabled).to.be.false;
        });
      });

      describe('Validate', () => {
        beforeEach(async () => {
          await settings.maxRecordsPerResponseChange.fillAndBlur('50');
        });

        it('should be enabled button save', () => {
          expect(settings.validationMessage).to.equal('');
        });
      });
    });
  });
});
