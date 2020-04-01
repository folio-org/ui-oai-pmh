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
  });
});
