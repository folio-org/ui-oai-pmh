import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SetsViewInteractor from '../../interactors/sets-view';
import translation from '../../../../translations/ui-oai-pmh/en';

describe('Sets', () => {
  setupApplication();
  let setsTest;

  describe('View', () => {
    beforeEach(function () {
      setsTest = this.server.create('sets');

      this.visit(`/settings/oaipmh/sets/${setsTest.id}/view`);
    });

    it('should be correct pane header title', () => {
      expect(SetsViewInteractor.paneHeader.title).to.equal(translation['settings.sets.view.title']);
    });
  });
});
