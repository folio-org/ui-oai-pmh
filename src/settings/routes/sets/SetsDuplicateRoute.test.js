import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { renderWithRouter, setsFilteringConditions } from '../../../../test/jest/helpers';
import SetsDuplicateRoute from './SetsDuplicateRoute';
import SetsContext from './SetsContext';
import { useSetCreate } from '../../hooks/useSetCreate';
import { useSetDetails } from '../../hooks/useSetDetails';
import { setDetailsMock } from '../../../../test/jest/helpers/setDetails';

jest.mock('../../hooks/useSetCreate');
jest.mock('../../hooks/useSetDetails');

const queryClient = new QueryClient();

const renderSetsDuplicateRoute = () => (
  renderWithRouter(
    <QueryClientProvider client={queryClient}>
      <SetsContext.Provider value={{ setsFilteringConditions }}>
        <SetsDuplicateRoute />
      </SetsContext.Provider>
    </QueryClientProvider>
  )
);

describe('SetsDuplicateRoute', () => {
  const createFn = jest.fn();

  beforeEach(() => {
    useSetDetails.mockReturnValue({
      setDetails: setDetailsMock,
      isSetLoading: false,
      isError: false,
    });

    useSetCreate.mockReturnValue({
      createSet: createFn,
      isLoading: false,
    });
  });

  afterEach(() => {
    useSetCreate.mockClear();
    useSetDetails.mockClear();
  });

  it('should render route', async () => {
    renderSetsDuplicateRoute();

    const setMameInput = screen.getByRole('textbox', { name: /sets.edit.field.name/ });
    const activeCheckboxes = screen.getAllByRole('checkbox', { name: /field.name.ariaLabel/ });
    const valueSelects = screen.getAllByRole('combobox', { name: /field.value.ariaLabel/ });
    const annexOption = screen.getByRole('option', { name: 'Annex' });
    const saveButton = screen.getByRole('button', { name: /saveAndClose/ });

    userEvent.type(setMameInput, 'test');
    userEvent.click(activeCheckboxes[0]);
    userEvent.selectOptions(valueSelects[0], annexOption);
    userEvent.click(saveButton);

    expect(createFn).toBeCalled();
  });
});
