import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';

import { renderWithRouter, setsFilteringConditions } from '../../../../test/jest/helpers';
import SetsContext from './SetsContext';
import { useSetDetails } from '../../hooks/useSetDetails';
import { useSetUpdate } from '../../hooks/useSetUpdate';
import { setDetailsMock } from '../../../../test/jest/helpers/setDetails';

import '../../../../test/jest/__mock__';

import SetsEditRoute from './SetsEditRoute';

const queryClient = new QueryClient();

jest.mock('../../hooks/useSetDetails', () => ({
  useSetDetails: jest.fn(),
}));

jest.mock('../../hooks/useSetUpdate', () => ({
  useSetUpdate: jest.fn(),
}));

const renderSetaEditRoute = () => (
  renderWithRouter(
    <QueryClientProvider client={queryClient}>
      <SetsContext.Provider value={{ setsFilteringConditions }}>
        <SetsEditRoute />
      </SetsContext.Provider>
    </QueryClientProvider>
  )
);

describe('SetaEditRoute', () => {
  beforeEach(() => {
    useSetDetails.mockReturnValue({
      setDetails: setDetailsMock,
      isSetLoading: false,
      isError: false,
    });

    useSetUpdate.mockReturnValue({
      updateSet: jest.fn(),
    });
  });

  afterEach(() => {
    useSetDetails.mockReset();
    useSetUpdate.mockReset();
  });

  it('should render route', async () => {
    await act(async () => renderSetaEditRoute());

    const setMameInput = screen.getByRole('textbox', { name: /sets.edit.field.name/ });
    const activeCheckboxes = screen.getAllByRole('checkbox', { name: /field.name.ariaLabel/ });
    const valueSelects = screen.getAllByRole('combobox', { name: /field.value.ariaLabel/ });
    const annexOption = screen.getByRole('option', { name: 'Annex' });
    const saveButton = screen.getByRole('button', { name: /saveAndClose/ });

    user.type(setMameInput, 'test name');
    user.click(activeCheckboxes[0]);
    user.selectOptions(valueSelects[0], annexOption);
    user.click(saveButton);
  });
});
