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

  describe('Create', () => {
    beforeEach(function () {
      this.visit('/settings/oai-pmh/sets/create');
    });

    describe('Pane header', () => {
      it('should render correct title', () => {
        expect(SetsFormInteractor.paneHeader.title).to.equal(translation['settings.sets.new.title']);
      });
    });
  });
});
