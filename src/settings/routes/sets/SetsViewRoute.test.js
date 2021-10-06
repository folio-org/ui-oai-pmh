import React from 'react';
import { screen, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import buildStripes from '../../../../test/jest/__mock__/stripesCore.mock';
import { renderWithRouter, setsFilteringConditions } from '../../../../test/jest/helpers';

import SetsViewRoute from './SetsViewRoute';
import SetsContext from './SetsContext';

const STRIPES = buildStripes();

const history = createMemoryHistory();

const locationMock = {
  pathname: '/settings/oai-pmh/sets/6d18cafb-d498-4bb4-b69d-57d0e4a50254',
  hash: ''
};

const matchMock = {
  params: {
    id: '6d18cafb-d498-4bb4-b69d-57d0e4a50254'
  },
};

const mutatorMock = {
  viewSets: {
    DELETE: jest.fn(() => Promise.resolve()),
    GET: jest.fn(() => Promise.resolve()).mockResolvedValue(true)
  }
};

const renderSetsViewRoute = (
  mutator = mutatorMock
) => (
  renderWithRouter(
    <SetsContext.Provider value={{ setsFilteringConditions }}>
      <SetsViewRoute
        history={history}
        location={locationMock}
        mutator={mutator}
        stripes={STRIPES}
        match={matchMock}
      />
    </SetsContext.Provider>
  )
);

describe('SetsViewRoute', () => {
  it('should show right labels for filtering conditions', async () => {
    await act(async () => renderSetsViewRoute());

    const labels = [
      /sets.view.filteringConditions.field.name/,
      /sets.view.filteringConditions.field.value/,
      /sets.view.filteringConditions.field.setSpec/
    ];

    labels.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should be correct pane header title', async () => {
    await act(async () => renderSetsViewRoute());

    expect(screen.getByRole('heading', { name: /settings.sets.view.title/ })).toBeEnabled();
  });

  it('should display close pane button', async () => {
    await act(async () => renderSetsViewRoute());


    expect(screen.getByRole('button', { name: /settings.sets.form.button.cancel/ })).toBeEnabled();
  });

  it('should display expend button', async () => {
    await act(async () => renderSetsViewRoute());

    expect(screen.getByRole('button', { name: 'stripes-components.paneMenuActionsToggleLabel' })).toBeVisible();
  });

  it('should be enabled actions button', async () => {
    await act(async () => renderSetsViewRoute());

    const actionButtons = [
      /settings.sets.action.edit/,
      /settings.sets.action.duplicate/,
      /settings.sets.action.delete/,
    ];

    actionButtons.forEach((el) => expect(screen.getByText(el)).toBeEnabled());
  });
});
