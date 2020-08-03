import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SetsViewInteractor from '../../interactors/sets-view';

describe('Sets', () => {
  setupApplication({
    scenarios: 'success-delete',
  });
  let setsTest;
  const initialValues = {
    id: 'id',
  };
  const listPath = '/settings/oai-pmh/sets';
  const viewPath = `/settings/oai-pmh/sets/${initialValues.id}/view`;

  describe('View', () => {
    beforeEach(function () {
      setsTest = this.server.create('set', initialValues);

      this.visit(viewPath);
    });

    describe('Pane header', () => {
      it('should be correct pane header title', () => {
        expect(SetsViewInteractor.paneHeader.title).to.equal(`View ${setsTest.name}`);
      });

      it('should display close pane button', () => {
        expect(SetsViewInteractor.paneHeader.dismissButton.isPresent).to.be.true;
      });

      it('should display actions button', () => {
        expect(SetsViewInteractor.paneHeader.actionsButton.isPresent).to.be.true;
      });

      it('should not display actions dropdown', () => {
        expect(SetsViewInteractor.paneHeader.actionsDropdown.isPresent).to.be.false;
      });

      describe('Action buttons', () => {
        beforeEach(async () => {
          await SetsViewInteractor.paneHeader.actionsButton.click();
        });

        it('should be open actions dropdown', () => {
          expect(SetsViewInteractor.paneHeader.actionsDropdown.isPresent).to.be.true;
        });

        it('should has edit action button', () => {
          expect(SetsViewInteractor.editButton.isPresent).to.be.true;
        });

        it('should has delete action button', () => {
          expect(SetsViewInteractor.deleteButton.isPresent).to.be.true;
        });

        describe('Delete action', () => {
          beforeEach(async () => {
            await SetsViewInteractor.deleteButton.click();
          });

          it('should show confirmation modal', () => {
            expect(SetsViewInteractor.confirmDeleteSetsModal.isPresent).to.be.true;
          });

          it('should display confirm button', () => {
            expect(SetsViewInteractor.confirmDeleteSetsModal.confirmButton.isPresent).to.be.true;
          });

          it('should display cancel button', () => {
            expect(SetsViewInteractor.confirmDeleteSetsModal.cancelButton.isPresent).to.be.true;
          });

          describe('Confirm button', () => {
            beforeEach(async () => {
              await SetsViewInteractor.confirmDeleteSetsModal.confirmButton.click();
            });

            it('should close confirmation modal', () => {
              expect(SetsViewInteractor.confirmDeleteSetsModal.isPresent).to.be.false;
            });

            it('should show success callout', () => {
              expect(SetsViewInteractor.callout.successCalloutIsPresent).to.be.true;
            });

            it('should navigate to list page', function () {
              expect(this.location.pathname).to.equal(listPath);
            });
          });

          describe('Cancel button', () => {
            beforeEach(async () => {
              await SetsViewInteractor.confirmDeleteSetsModal.cancelButton.click();
            });

            it('should close confirmation modal', () => {
              expect(SetsViewInteractor.confirmDeleteSetsModal.isPresent).to.be.false;
            });

            it('should stay on view page', function () {
              expect(this.location.pathname).to.equal(viewPath);
            });
          });
        });

        describe('clicking close pane button', () => {
          beforeEach(async () => {
            await SetsViewInteractor.paneHeader.dismissButton.click();
          });

          it('should navigate to list page', function () {
            expect(this.location.pathname).to.equal(listPath);
          });
        });
      });
    });
  });
});
