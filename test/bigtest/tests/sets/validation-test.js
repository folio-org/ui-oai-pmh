import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SetsFormInteractor from '../../interactors/sets-form';

describe('Validation', () => {
  const triggerChangeAfterLoad = async () => {
    await SetsFormInteractor.whenLoaded();

    await SetsFormInteractor.name.fillAndBlur('with changes');

    await SetsFormInteractor.paneHeaderSaveButton.click();
  };

  const reusedValidationTests = (name, currentPath, initialValues) => {
    describe(name, () => {
      describe('Save valid data', () => {
        setupApplication();

        beforeEach(async function () {
          this.server.create('set', initialValues);

          this.visit(currentPath);

          await triggerChangeAfterLoad();
        });

        it('should show success callout', () => {
          expect(SetsFormInteractor.callout.successCalloutIsPresent).to.be.true;
        });
      });

      describe('Save invalid data', () => {
        setupApplication();

        beforeEach(async function () {
          this.server.create('set', {
            ...initialValues,
            filteringConditions: [],
          });

          this.visit(currentPath);

          await triggerChangeAfterLoad();
        });

        it('should show error callout', () => {
          expect(SetsFormInteractor.callout.errorCalloutIsPresent).to.be.true;
        });
      });

      describe('Handle save error', () => {
        setupApplication({
          scenarios: 'save-error',
        });

        beforeEach(async function () {
          this.server.create('set', initialValues);

          this.visit(currentPath);

          await triggerChangeAfterLoad();
        });

        it('should show error callout', () => {
          expect(SetsFormInteractor.callout.errorCalloutIsPresent).to.be.true;
        });
      });

      describe('Handle save error on unique', () => {
        setupApplication({
          scenarios: 'save-not-unique-error',
        });

        beforeEach(async function () {
          this.server.create('set', initialValues);

          this.visit(currentPath);

          await triggerChangeAfterLoad();
        });

        it('should show error callout', () => {
          expect(SetsFormInteractor.callout.errorCalloutIsPresent).to.be.true;
        });
      });
    });
  };

  describe('Pages', () => {
    const initialValues = {
      id: 'id',
      name: 'values name',
      description: 'values description',
      filteringConditions: [{
        name : 'location',
        active: true,
        value : 'location 1',
        setSpec : 'Loc_L1',
      }],
    };
    const pages = [
      {
        name: 'Edit',
        currentPath: `/settings/oai-pmh/sets/${initialValues.id}/edit`,
        values: initialValues,
      },
      {
        name: 'Duplicate',
        currentPath: `/settings/oai-pmh/sets/${initialValues.id}/duplicate`,
        values: initialValues,
      },
    ];

    pages.forEach((page) => {
      const {
        name,
        currentPath,
        values,
      } = page;

      reusedValidationTests(name, currentPath, values);
    });
  });
});
