import React from 'react';
import { noop } from 'lodash';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../../../../test/jest/__mock__';

import { renderWithRouter } from '../../../../../test/jest/helpers';
import SetView from './SetsView';


describe('Sets list', () => {
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

  const emptyfilteringConditions = [
    {
      name : 'location',
      values : [],
    }
  ];

  const onBackMock = jest.fn();
  const onDeleteMock = jest.fn();
  const onDuplicateMock = jest.fn();
  const onEditMock = jest.fn();

  const renderSetsView = (showActionMenu) => {
    renderWithRouter(
      <SetView
        showActionMenu={showActionMenu}
        sets={sets}
        paneTitle={() => 'paneTitle-test'}
        onBack={onBackMock}
        onDelete={onDeleteMock}
        onDuplicate={onDuplicateMock}
        onEdit={onEditMock}
        setsFilteringConditions={filteringConditions}
      />
    );
  };

  const renderEmptySetView = () => {
    renderWithRouter(
      <SetView
        showActionMenu
        sets={noop}
        paneTitle={() => 'paneTitle-test'}
        onBack={onBackMock}
        onDelete={onDeleteMock}
        onDuplicate={onDuplicateMock}
        onEdit={onEditMock}
        setsFilteringConditions={emptyfilteringConditions}
      />
    );
  };

  it('should be correct pane header title', () => {
    renderSetsView(false);

    expect(screen.getByRole('heading', { name: 'paneTitle-test' })).toBeEnabled();
  });

  it('should display close pane button', () => {
    renderSetsView(false);

    expect(screen.getByRole('button', { name: 'ui-oai-pmh.settings.sets.form.button.cancel' })).toBeEnabled();
  });

  it('should display expend button', () => {
    renderSetsView(true);

    expect(screen.getByRole('button', { name: 'stripes-components.paneMenuActionsToggleLabel' })).toBeVisible();
  });

  it('should be enabled actions button', () => {
    renderSetsView(true);

    const actionButtons = [
      'ui-oai-pmh.settings.sets.action.edit',
      'ui-oai-pmh.settings.sets.action.duplicate',
      'ui-oai-pmh.settings.sets.action.delete',
    ];

    actionButtons.forEach((el) => expect(screen.getByText(el)).toBeEnabled());
  });

  it('should be called onEdit on click edit button ', () => {
    renderSetsView(true);

    const editButton = screen.getByText('ui-oai-pmh.settings.sets.action.edit');

    userEvent.click(editButton);

    expect(onEditMock).toHaveBeenCalled();
  });

  it('should be called onDelete on click delete button ', () => {
    renderSetsView(true);

    const deleteButton = screen.getByText('ui-oai-pmh.settings.sets.action.delete');

    userEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalled();
  });

  it('should be called onDuplicate on click duplicate button ', () => {
    renderSetsView(true);

    const duplicateButton = screen.getByText('ui-oai-pmh.settings.sets.action.duplicate');

    userEvent.click(duplicateButton);

    expect(onDuplicateMock).toHaveBeenCalled();
  });

  it('should show right labels for filtering conditions', () => {
    renderSetsView(true);

    const labels = [
      'ui-oai-pmh.settings.sets.view.filteringConditions.field.name',
      'ui-oai-pmh.settings.sets.view.filteringConditions.field.value',
      'ui-oai-pmh.settings.sets.view.filteringConditions.field.setSpec'
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
    renderEmptySetView();

    const emptyContenFields = screen.getAllByText('noop');

    emptyContenFields.forEach((el) => expect(el).toBeVisible());
  });
});
