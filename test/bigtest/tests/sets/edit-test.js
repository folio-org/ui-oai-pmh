import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SetsFormInteractor from '../../interactors/sets-form';
import translation from '../../../../translations/ui-oai-pmh/en';

describe('Sets', () => {
  setupApplication();
  let setsTest;

  describe('Edit', () => {
    beforeEach(function () {
      setsTest = this.server.create('set');

      this.visit(`/settings/oaipmh/sets/${setsTest.id}/edit`);
    });

    it('should be correct pane header title', () => {
      expect(SetsFormInteractor.paneHeader.title).to.equal(translation['settings.sets.edit.title']);
    });

    describe('navigate back without changes', () => {
      beforeEach(async () => {
        await SetsFormInteractor.paneHeader.dismissButton.click();
      });

      it('should navigate back to sets list page', function () {
        expect(this.location.pathname).to.equal('/settings/oaipmh/sets');
      });
    });
  });
});
