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

  const confirmationModalTests = (currentPath, redirectBackPath, cancelButton) => {
    describe('Without changes', () => {
      beforeEach(async () => {
        await cancelButton.click();
      });

      it('should navigate back after click on dismiss button in pane header', function () {
        expect(this.location.pathname).to.equal(redirectBackPath);
      });
    });

    describe('With changes', () => {
      beforeEach(async () => {
        await SetsFormInteractor.name.fillAndBlur('with changes');
        await cancelButton.click();
      });

      it('should appears confirmation modal', () => {
        expect(SetsFormInteractor.navigateBackConfirmationModal.isPresent).to.be.true;
      });

      describe('click cancel (close without saving)', () => {
        beforeEach(async () => {
          await SetsFormInteractor.clickCancelNavigationButton.click();
        });

        it('should navigate back after click on dismiss button in confirmation modal', function () {
          expect(this.location.pathname).to.equal(redirectBackPath);
        });
      });

      describe('click continue (keep editing)', () => {
        beforeEach(async () => {
          await SetsFormInteractor.clickContinueNavigationButton.click();
        });

        it('should close confirmation modal', () => {
          expect(SetsFormInteractor.navigateBackConfirmationModal.isPresent).to.be.false;
        });

        it('should keep on the same page', function () {
          expect(this.location.pathname).to.contain(currentPath);
        });
      });
    });
  };

  const reusedCreateEditTests = (currentPath, redirectBackPath, initialValues) => {
    describe('Pane header', () => {
      const cancelButton = SetsFormInteractor.paneHeader.dismissButton;

      confirmationModalTests(currentPath, redirectBackPath, cancelButton);
    });

    describe('Expand/collapse all button', () => {
      it('should has expand/collapse all button', () => {
        expect(SetsFormInteractor.expandAllButton.isPresent).to.be.true;
      });

      it('should be correct button label (Collapse all)', () => {
        expect(SetsFormInteractor.expandAllButton.label).to.equal('Collapse all');
      });

      describe('Click on expand/collapse all button', () => {
        beforeEach(async () => {
          await SetsFormInteractor.expandAllButton.clickExpandAllButton();
        });

        it('should be correct button label (Expand all)', () => {
          expect(SetsFormInteractor.expandAllButton.label).to.equal('Expand all');
        });
      });
    });

    describe('Form values', () => {
      describe('General information', () => {
        describe('field labels', () => {
          it('should render set name label', () => {
            expect(SetsFormInteractor.name.label).to.contain(translation['settings.sets.edit.field.name']);
          });

          it('should render set description label', () => {
            expect(SetsFormInteractor.description.label).to.equal(translation['settings.sets.edit.field.description']);
          });

          it('should render set specification label', () => {
            expect(SetsFormInteractor.setSpecLabel).to.equal(translation['settings.sets.edit.field.setSpecification']);
          });
        });

        describe('initial load', () => {
          it('should render set name', () => {
            expect(SetsFormInteractor.name.val).to.equal(initialValues.name);
          });

          it('should render set description', () => {
            expect(SetsFormInteractor.description.val).to.equal(initialValues.description);
          });

          it('should render set specification', () => {
            expect(SetsFormInteractor.setSpecText).to.equal(initialValues.setSpec);
          });
        });

        describe('change values', () => {
          const newValues = {
            name: 'new name',
            description: 'new description',
          };

          beforeEach(async () => {
            await SetsFormInteractor.name.fillAndBlur(newValues.name);
            await SetsFormInteractor.description.fillAndBlur(newValues.description);
          });

          it('should change set name', () => {
            expect(SetsFormInteractor.name.val).to.equal(newValues.name);
          });

          it('should change set description', () => {
            expect(SetsFormInteractor.description.val).to.equal(newValues.description);
          });

          it('should change set specification', () => {
            expect(SetsFormInteractor.setSpecText).to.equal(initialValues.setSpec);
          });
        });
      });

      describe('Filtering conditions', () => {
        describe('Title', () => {
          it('should be correct label text for name', () => {
            expect(SetsFormInteractor.filteringConditionsTitleName)
              .to.equal(translation['settings.sets.edit.filteringConditions.field.name']);
          });

          it('should be correct label text for active', () => {
            expect(SetsFormInteractor.filteringConditionsTitleActive)
              .to.equal(translation['settings.sets.edit.filteringConditions.field.active']);
          });

          it('should be correct label text for value', () => {
            expect(SetsFormInteractor.filteringConditionsTitleValue)
              .to.equal(translation['settings.sets.edit.filteringConditions.field.value']);
          });

          it('should be correct label text for set specification', () => {
            expect(SetsFormInteractor.filteringConditionsTitleSetSpec)
              .to.equal(translation['settings.sets.edit.filteringConditions.field.setSpec']);
          });
        });

        describe('initial load', () => {
          it('should render location', () => {
            expect(SetsFormInteractor.filteringConditionsRow(0).name)
              .to.equal(translation['settings.sets.filteringCondition.location']);
          });

          it('should render active', () => {
            expect(SetsFormInteractor.filteringConditionsRow(0).active.isChecked)
              .to.equal(initialValues.filteringConditions[0].active);
          });

          it('should render value', () => {
            expect(SetsFormInteractor.filteringConditionsRow(0).value.val)
              .to.equal(initialValues.filteringConditions[0].value);
          });

          it('should render set specification', () => {
            expect(SetsFormInteractor.filteringConditionsRow(0).setSpec.val)
              .to.equal(initialValues.filteringConditions[0].setSpec);
          });
        });

        describe('change values', () => {
          const newValues = {
            value : 'location 2',
            setSpec : 'Loc_L2',
          };

          beforeEach(async () => {
            if (!SetsFormInteractor.filteringConditionsRow(0).active.isChecked) {
              await SetsFormInteractor.filteringConditionsRow(0).active.clickAndBlur();
            }

            await SetsFormInteractor.filteringConditionsRow(0).value.selectAndBlur(newValues.value);
          });

          it('should change value', () => {
            expect(SetsFormInteractor.filteringConditionsRow(0).value.val)
              .to.equal(newValues.value);
          });

          it('should change set specification', () => {
            expect(SetsFormInteractor.filteringConditionsRow(0).setSpec.val)
              .to.equal(newValues.setSpec);
          });
        });
      });

      describe('Filtering conditions', () => {
        beforeEach(async () => {
          if (!SetsFormInteractor.filteringConditionsRow(0).active.isChecked) {
            await SetsFormInteractor.filteringConditionsRow(0).active.clickAndBlur();
          }

          await SetsFormInteractor.filteringConditionsRow(0).active.clickAndBlur();
        });

        it('should change value', () => {
          expect(SetsFormInteractor.filteringConditionsRow(0).value.val)
            .to.equal('');
        });

        it('should change set specification', () => {
          expect(SetsFormInteractor.filteringConditionsRow(0).setSpec.val)
            .to.equal('');
        });
      });
    });

    describe('Pane footer', () => {
      describe('Cancel button', () => {
        const cancelButton = SetsFormInteractor.paneHeaderCancelButton;

        it('should be present cancel button', () => {
          expect(cancelButton.isPresent).to.be.true;
        });

        confirmationModalTests(currentPath, redirectBackPath, cancelButton);
      });

      describe('Save button', () => {
        it('should be present save button', () => {
          expect(SetsFormInteractor.paneHeaderSaveButton.isPresent).to.be.true;
        });
      });
    });
  };

  describe('Create', () => {
    const initialValues = {
      name: '',
      description: '',
      setSpec: '',
      filteringConditions: [{
        name : '',
        active: false,
        value : '',
        setSpec : '',
      }],
    };
    const currentPath = '/settings/oai-pmh/sets/create';
    const redirectBackPath = '/settings/oai-pmh/sets';

    beforeEach(async function () {
      this.visit(currentPath);

      await SetsFormInteractor.whenLoaded();
    });

    reusedCreateEditTests(currentPath, redirectBackPath, initialValues);
  });

  describe('Edit', () => {
    const initialValues = {
      id: 'id',
      name: 'initial values name',
      description: 'initial values description',
      setSpec: 'Loc_L1',
      filteringConditions: [{
        name : 'location',
        active: true,
        value : 'location 1',
        setSpec : 'Loc_L1',
      }],
    };
    const currentPath = `/settings/oai-pmh/sets/${initialValues.id}/edit`;
    const redirectBackPath = `/settings/oai-pmh/sets/${initialValues.id}/view`;

    beforeEach(async function () {
      this.server.create('set', initialValues);

      this.visit(currentPath);

      await SetsFormInteractor.whenLoaded();
    });

    reusedCreateEditTests(currentPath, redirectBackPath, initialValues);
  });

  describe('Duplicate', () => {
    const initialValues = {
      id: 'id',
      name: 'initial values name',
      description: 'initial values description',
      setSpec: 'Loc_L1',
      filteringConditions: [{
        name : 'location',
        active: true,
        value : 'location 1',
        setSpec : 'Loc_L1',
      }],
    };
    const currentPath = `/settings/oai-pmh/sets/${initialValues.id}/duplicate`;
    const redirectBackPath = `/settings/oai-pmh/sets/${initialValues.id}/view`;

    beforeEach(async function () {
      this.server.create('set', initialValues);

      this.visit(currentPath);

      await SetsFormInteractor.whenLoaded();
    });

    reusedCreateEditTests(currentPath, redirectBackPath, initialValues);
  });
});
