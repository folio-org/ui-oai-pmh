import React from 'react';
import { noop } from 'lodash';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { runAxeTest } from '@folio/stripes-testing';

import '../../../../../test/jest/__mock__';
import { renderWithRouter } from '../../../../../test/jest/helpers';
import SetView from './SetsView';


const sets = {
  metadata: {
    createdByUserId: 'f6155b79-03c5-5a3e-ab66-95e4ad417430',
    createdDate: '2021-09-29T06:35:06.919+00:00',
    updatedByUserId: 'f6155b79-03c5-5a3e-ab66-95e4ad417430',
    updatedDate: '2021-09-29T06:35:06.919+00:00',
  },
  description: 'test description',
  id: 'c9491f89-883c-48a7-a70f-1f15fe1073f9',
  name: 'test name',
  setSpec: 'Loc_Ann',
};

const filteringConditions = [
  {
    name : 'location',
    values : ['Popular Reading Collection',
      'ORWIG ETHNO CD',
      'Main Library',
      'Online',
      'SECOND FLOOR',
      'Annex'],
  }
];

const onBackMock = jest.fn();
const onDeleteMock = jest.fn();
const onDuplicateMock = jest.fn();
const onEditMock = jest.fn();

const renderSetsView = (showActionMenu, set = sets) => {
  renderWithRouter(
    <SetView
      showActionMenu={showActionMenu}
      sets={set}
      paneTitle={() => 'paneTitle-test'}
      onBack={onBackMock}
      onDelete={onDeleteMock}
      onDuplicate={onDuplicateMock}
      onEdit={onEditMock}
      setsFilteringConditions={filteringConditions}
    />
  );
};

describe('Sets view', () => {
  it('should be correct pane header title', () => {
    renderSetsView(false);

    expect(screen.getByRole('heading', { name: 'paneTitle-test' })).toBeEnabled();
  });

  it('should display close pane button', () => {
    renderSetsView(false);

    expect(screen.getByRole('button', { name: /sets.form.button.cancel/ })).toBeEnabled();
  });

  it('should display expend button', () => {
    renderSetsView(true);

    expect(screen.getByRole('button', { name: 'stripes-components.paneMenuActionsToggleLabel' })).toBeVisible();
  });

  it('should be enabled actions button', () => {
    renderSetsView(true);

    const actionButtons = [
      /sets.action.edit/,
      /sets.action.duplicate/,
      /sets.action.delete/,
    ];

    actionButtons.forEach((el) => expect(screen.getByText(el)).toBeEnabled());
  });

  it('should be called onEdit on click edit button ', () => {
    renderSetsView(true);

    const editButton = screen.getByText(/sets.action.edit/);

    userEvent.click(editButton);

    expect(onEditMock).toHaveBeenCalled();
  });

  it('should be called onDelete on click delete button ', () => {
    renderSetsView(true);

    const deleteButton = screen.getByText(/sets.action.delete/);

    userEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalled();
  });

  it('should be called onDuplicate on click duplicate button ', () => {
    renderSetsView(true);

    const duplicateButton = screen.getByText(/sets.action.duplicate/);

    userEvent.click(duplicateButton);

    expect(onDuplicateMock).toHaveBeenCalled();
  });

  it('should show right labels for filtering conditions', () => {
    renderSetsView(true);

    const labels = [
      /sets.view.filteringConditions.field.name/,
      /sets.view.filteringConditions.field.value/,
      /sets.view.filteringConditions.field.setSpec/
    ];

    labels.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should be correct text in Content fields', () => {
    renderSetsView(true);

    const setContent = [
      'test description',
      'Loc_Ann',
    ];

    setContent.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should be correct text in Content fields', () => {
    renderSetsView(true);

    const setContent = [
      'test description',
      'Loc_Ann',
    ];

    setContent.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should have empty fields', () => {
    renderSetsView(true, noop);

    const emptyContenFields = screen.getAllByText('noop');

    emptyContenFields.forEach((el) => expect(el).toBeVisible());
  });

  it('should render with no axe errors', async () => {
    renderSetsView(true);

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
