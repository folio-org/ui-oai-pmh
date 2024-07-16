import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { renderWithRouter, setsFilteringConditions } from '../../../../test/jest/helpers';
import SetsCreateRoute from './SetsCreateRoute';
import SetsContext from './SetsContext';
import { useSetDetails } from '../../hooks/useSetDetails';
import { setDetailsMock } from '../../../../test/jest/helpers/setDetails';
import { useSetCreate } from '../../hooks/useSetCreate';

jest.mock('../../hooks/useSetCreate');
jest.mock('../../hooks/useSetDetails');

const queryClient = new QueryClient();

const renderSetCreateRoute = () => (
  renderWithRouter(
    <QueryClientProvider client={queryClient}>
      <SetsContext.Provider value={{ setsFilteringConditions }}>
        <SetsCreateRoute />
      </SetsContext.Provider>
    </QueryClientProvider>
  )
);

describe('SetsCreateRoute', () => {
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
    renderSetCreateRoute();

    const setMameInput = screen.getByRole('textbox', { name: /sets.edit.field.name/ });
    const activeCheckboxes = screen.getAllByRole('checkbox', { name: /field.name.ariaLabel/ });
    const valueSelects = screen.getAllByRole('combobox', { name: /field.value.ariaLabel/ });
    const annexOption = screen.getByRole('option', { name: 'Annex' });
    const saveButton = screen.getByRole('button', { name: /saveAndClose/ });

    user.type(setMameInput, 'test name');
    user.click(activeCheckboxes[0]);
    user.selectOptions(valueSelects[0], annexOption);
    user.click(saveButton);

    expect(createFn).toBeCalled();
  });
});
