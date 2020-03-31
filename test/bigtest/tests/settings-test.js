import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SettingsInteractor from '../interactors/settings';
import translation from '../../../translations/ui-oai-pmh/en';

describe('Settings', () => {
  const settings = new SettingsInteractor();

  setupApplication();

  describe('General settings page', () => {
    beforeEach(function () {
      this.visit('/settings/oaipmh/general');
    });

    it('should have a general settings message', () => {
      expect(settings.generalMessage).to.equal(translation['settings.general.message']);
    });
  });
});
