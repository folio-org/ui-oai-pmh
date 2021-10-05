import React from 'react';
import { screen, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import user from '@testing-library/user-event';

import buildStripes from '../../../../test/jest/__mock__/stripesCore.mock';
import { renderWithRouter, setsFilteringConditions } from '../../../../test/jest/helpers';

import SetsEditRoute from './SetsEditRoute';
import SetsContext from './SetsContext';

const STRIPES = buildStripes();

const history = createMemoryHistory();

const locationMock = {
  pathname: '/settings/oai-pmh/sets/6d18cafb-d498-4bb4-b69d-57d0e4a50254',
  hash: ''
};

const mutatorMock = {
  editSets: {
    PUT: jest.fn(() => Promise.resolve()),
    GET: jest.fn(() => Promise.resolve()).mockResolvedValue(true)
  }
};

const renderSetaEditRoute = (
  mutator = mutatorMock
) => (
  renderWithRouter(
    <SetsContext.Provider value={{ setsFilteringConditions }}>
      <SetsEditRoute
        history={history}
        location={locationMock}
        mutator={mutator}
        stripes={STRIPES}
      />
    </SetsContext.Provider>
  )
);

describe('SetaEditRoute', () => {
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

    expect(mutatorMock.editSets.PUT).toBeCalled();
  });
});
