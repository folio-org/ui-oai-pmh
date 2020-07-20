import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SetsListInteractor from '../../interactors/sets-list';

import translation from '../../../../translations/ui-oai-pmh/en';

describe('Sets', () => {
  setupApplication();

  describe('List', () => {
    beforeEach(function () {
      return this.visit('/settings/oai-pmh/sets');
    });

    it('should be correct pane header title', () => {
      expect(SetsListInteractor.paneHeader.title).to.equal(translation['settings.sets.list.title']);
    });

    describe('clicking new set button', () => {
      beforeEach(async () => {
        await SetsListInteractor.newSetButton.click();
      });

      it('should navigate to create set', function () {
        expect(this.location.pathname).to.equal('/settings/oai-pmh/sets/create');
      });
    });
  });
});
