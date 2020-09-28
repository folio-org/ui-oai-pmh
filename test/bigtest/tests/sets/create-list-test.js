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
  const set = {
    name: 'name',
    setSpec: 'specification',
    description: 'description',
    updatedDate: '2020-01-01T08:00:00.441+0000',
  };

  describe('List', () => {
    beforeEach(async function () {
      this.server.create('set', set);

      this.visit('/settings/oai-pmh/sets');

      await SetsListInteractor.whenLoaded();
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

    describe('render set list', () => {
      describe('Title', () => {
        it('should be correct label text for name', () => {
          expect(SetsListInteractor.setsList.headers(0).text)
            .to.be.equal(translation['settings.sets.list.field.name']);
        });

        it('should be correct label text for specification', () => {
          expect(SetsListInteractor.setsList.headers(1).text)
            .to.be.equal(translation['settings.sets.list.field.setSpec']);
        });

        it('should be correct label text for description', () => {
          expect(SetsListInteractor.setsList.headers(2).text)
            .to.be.equal(translation['settings.sets.list.field.description']);
        });

        it('should be correct label text for updated date', () => {
          expect(SetsListInteractor.setsList.headers(3).text)
            .to.be.equal(translation['settings.sets.list.field.updatedDate']);
        });
      });

      describe('Content', () => {
        it('should be correct text for name', () => {
          expect(SetsListInteractor.setsList.rows(0).cells(0).text)
            .to.be.equal(set.name);
        });

        it('should be correct text for specification', () => {
          expect(SetsListInteractor.setsList.rows(0).cells(1).text)
            .to.be.equal(set.setSpec);
        });

        it('should be correct text for description', () => {
          expect(SetsListInteractor.setsList.rows(0).cells(2).text)
            .to.be.equal(set.description);
        });

        it('should be correct text for updated date', () => {
          expect(SetsListInteractor.setsList.rows(0).cells(3).text)
            .to.be.equal('1/1/2020 8:00 AM');
        });
      });
    });
  });
});
