import React from 'react';
import { screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { renderWithRouter, setsFilteringConditions } from '../../../../test/jest/helpers';

import SetsViewRoute from './SetsViewRoute';
import SetsContext from './SetsContext';
import { useSetDetails } from '../../hooks/useSetDetails';
import { useSetDelete } from '../../hooks/useSetDelete';
import { setDetailsMock } from '../../../../test/jest/helpers/setDetails';

jest.mock('../../hooks/useSetDelete');
jest.mock('../../hooks/useSetDetails');

const queryClient = new QueryClient();

const renderSetsViewRoute = () => (
  renderWithRouter(
    <QueryClientProvider client={queryClient}>
      <SetsContext.Provider value={{ setsFilteringConditions }}>
        <SetsViewRoute />
      </SetsContext.Provider>
    </QueryClientProvider>
  )
);

describe('SetsViewRoute', () => {
  const deleteFn = jest.fn();

  beforeEach(() => {
    useSetDetails.mockReturnValue({
      setDetails: setDetailsMock,
      isSetLoading: false,
      isError: false,
    });

    useSetDelete.mockReturnValue({
      deleteSet: deleteFn,
      isLoading: false,
    });
  });

  afterEach(() => {
    useSetDelete.mockClear();
    useSetDetails.mockClear();
  });

  it('should show right labels for filtering conditions', async () => {
    renderSetsViewRoute();

    const labels = [
      /sets.view.filteringConditions.field.name/,
      /sets.view.filteringConditions.field.value/,
      /sets.view.filteringConditions.field.setSpec/
    ];

    labels.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should be correct pane header title', async () => {
    renderSetsViewRoute();

    expect(screen.getByRole('heading', { name: /settings.sets.view.title/ })).toBeEnabled();
  });

  it('should display close pane button', async () => {
    renderSetsViewRoute();

    expect(screen.getByRole('button', { name: /settings.sets.form.button.cancel/ })).toBeEnabled();
  });

  it('should display expend button', async () => {
    renderSetsViewRoute();

    expect(screen.getByRole('button', { name: 'stripes-components.paneMenuActionsToggleLabel' })).toBeVisible();
  });

  it('should be enabled actions button', async () => {
    renderSetsViewRoute();

    const actionButtons = [
      /settings.sets.action.edit/,
      /settings.sets.action.duplicate/,
      /settings.sets.action.delete/,
    ];

    actionButtons.forEach((el) => expect(screen.getByText(el)).toBeEnabled());
  });
});
