import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SetsFormInteractor from '../../interactors/sets-form';

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
      describe('Initial load', () => {
        it('should render initial values', () => {
          expect(SetsFormInteractor.name.val).to.equal(initialValues.name);
          expect(SetsFormInteractor.description.val).to.equal(initialValues.description);
        });
      });

      describe('Change form values', () => {
        const newValues = {
          name: 'new name',
          description: 'new description',
        };

        beforeEach(async () => {
          await SetsFormInteractor.name.fillAndBlur(newValues.name);
          await SetsFormInteractor.description.fillAndBlur(newValues.description);
        });

        it('should change form values', () => {
          expect(SetsFormInteractor.name.val).to.equal(newValues.name);
          expect(SetsFormInteractor.description.val).to.equal(newValues.description);
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

        describe('With changes', () => {
          beforeEach(async () => {
            await SetsFormInteractor.name.fillAndBlur('with changes');
            await SetsFormInteractor.paneHeaderSaveButton.click();
          });

          it('should show success callout', () => {
            expect(SetsFormInteractor.callout.successCalloutIsPresent).to.be.true;
          });
        });
      });
    });
  };

  describe('Create', () => {
    const initialValues = {
      name: '',
      description: '',
    };
    const currentPath = '/settings/oai-pmh/sets/create';
    const redirectBackPath = '/settings/oai-pmh/sets';

    beforeEach(function () {
      this.visit(currentPath);
    });

    reusedCreateEditTests(currentPath, redirectBackPath, initialValues);
  });

  describe('Edit', () => {
    const initialValues = {
      id: 'id',
      name: 'initial values name',
      description: 'initial values description',
    };
    const currentPath = `/settings/oai-pmh/sets/${initialValues.id}/edit`;
    const redirectBackPath = `/settings/oai-pmh/sets/${initialValues.id}/view`;

    beforeEach(function () {
      this.server.create('set', initialValues);

      this.visit(currentPath);
    });

    reusedCreateEditTests(currentPath, redirectBackPath, initialValues);
  });

  describe('Duplicate', () => {
    const initialValues = {
      id: 'id',
      name: 'initial values name',
      description: 'initial values description',
    };
    const currentPath = `/settings/oai-pmh/sets/${initialValues.id}/duplicate`;
    const redirectBackPath = `/settings/oai-pmh/sets/${initialValues.id}/view`;

    beforeEach(function () {
      this.server.create('set', initialValues);

      this.visit(currentPath);
    });

    reusedCreateEditTests(currentPath, redirectBackPath, initialValues);
  });
});
