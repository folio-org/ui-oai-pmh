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
  setupApplication({
    scenarios: ['success-delete'],
  });
  let setsTest;
  const initialValues = {
    id: 'id',
    name: 'name',
    description: 'description',
    setSpec: 'specification',
    filteringConditions: [
      {
        name : 'location',
        value : 'location 1',
        setSpec : 'Loc_L1',
      },
    ],
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

        it('should have edit action button', () => {
          expect(SetsViewInteractor.editButton.isPresent).to.be.true;
        });

        it('should have duplicate action button', () => {
          expect(SetsViewInteractor.duplicateButton.isPresent).to.be.true;
        });

        it('should have delete action button', () => {
          expect(SetsViewInteractor.deleteButton.isPresent).to.be.true;
        });

        describe('Edit action', () => {
          beforeEach(async () => {
            await SetsViewInteractor.editButton.click();
          });

          it('should navigate to edit page', function () {
            expect(this.location.pathname).to.equal(`/settings/oai-pmh/sets/${setsTest.id}/edit`);
          });
        });

        describe('Duplicate action', () => {
          beforeEach(async () => {
            await SetsViewInteractor.duplicateButton.click();
          });

          it('should navigate to duplicate page', function () {
            expect(this.location.pathname).to.equal(`/settings/oai-pmh/sets/${setsTest.id}/duplicate`);
          });
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

        describe('Close pane button', () => {
          beforeEach(async () => {
            await SetsViewInteractor.paneHeader.dismissButton.click();
          });

          it('should navigate to list page', function () {
            expect(this.location.pathname).to.equal(listPath);
          });
        });
      });
    });

    describe('View', () => {
      describe('Expand/collapse all button', () => {
        it('should be correct headline', () => {
          expect(SetsViewInteractor.headline).to.equal(setsTest.name);
        });
        it('should has expand/collapse all button', () => {
          expect(SetsViewInteractor.expandAllButton.isPresent).to.be.true;
        });

        it('should be correct button label (Collapse all)', () => {
          expect(SetsViewInteractor.expandAllButton.label).to.equal('Collapse all');
        });

        describe('Click on expand/collapse all button', () => {
          beforeEach(async () => {
            await SetsViewInteractor.expandAllButton.clickExpandAllButton();
          });

          it('should be correct button label (Expand all)', () => {
            expect(SetsViewInteractor.expandAllButton.label).to.equal('Expand all');
          });
        });
      });

      describe('General information', () => {
        it('should be correct name', () => {
          expect(SetsViewInteractor.name.value.text).to.equal(setsTest.name);
        });

        it('should be correct description', () => {
          expect(SetsViewInteractor.description.value.text).to.equal(setsTest.description);
        });

        it('should be correct specification', () => {
          expect(SetsViewInteractor.setSpec.value.text).to.equal(setsTest.setSpec);
        });
      });

      describe('Filtering conditions', () => {
        it('should display filtering conditions list', () => {
          expect(SetsViewInteractor.filteringConditionsList.isPresent).to.be.true;
        });

        it('should be correct header labels for name', () => {
          expect(SetsViewInteractor.filteringConditionsList.headers(0).text)
            .to.equal(translation['settings.sets.view.filteringConditions.field.name']);
        });

        it('should be correct header labels for value', () => {
          expect(SetsViewInteractor.filteringConditionsList.headers(1).text)
            .to.equal(translation['settings.sets.view.filteringConditions.field.value']);
        });

        it('should be correct header labels for specification', () => {
          expect(SetsViewInteractor.filteringConditionsList.headers(2).text)
            .to.equal(translation['settings.sets.view.filteringConditions.field.setSpec']);
        });

        it('should be correct row(s) count', () => {
          expect(SetsViewInteractor.filteringConditionsList.rowCount).to.equal(1);
        });

        describe('Filtering conditions row', () => {
          it('should display correct name', () => {
            expect(SetsViewInteractor.filteringConditionsList.rows(0).cells(0).text)
              .to.equal(translation[`settings.sets.filteringCondition.${setsTest.filteringConditions[0].name}`]);
          });

          it('should display correct value', () => {
            expect(SetsViewInteractor.filteringConditionsList.rows(0).cells(1).content)
              .to.equal(setsTest.filteringConditions[0].value);
          });

          it('should display correct specification', () => {
            expect(SetsViewInteractor.filteringConditionsList.rows(0).cells(2).text)
              .to.equal(setsTest.filteringConditions[0].setSpec);
          });
        });
      });
    });
  });
});
