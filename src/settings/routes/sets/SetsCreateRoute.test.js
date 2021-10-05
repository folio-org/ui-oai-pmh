import React from 'react';
import { screen, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import user from '@testing-library/user-event';

import buildStripes from '../../../../test/jest/__mock__/stripesCore.mock';
import { renderWithRouter, setsFilteringConditions } from '../../../../test/jest/helpers';

import SetsCreateRoute from './SetsCreateRoute';
import SetsContext from './SetsContext';

const STRIPES = buildStripes();

const history = createMemoryHistory();

const locationMock = {
  pathname: '/settings/oai-pmh/sets',
  hash: ''
};

const mutatorMock = {
  createSets: {
    POST: jest.fn(() => Promise.resolve())
  }
};

const renderSetCreateRoute = (
  mutator = mutatorMock
) => (
  renderWithRouter(
    <SetsContext.Provider value={{ setsFilteringConditions }}>
      <SetsCreateRoute
        history={history}
        location={locationMock}
        mutator={mutator}
        stripes={STRIPES}
      />
    </SetsContext.Provider>
  )
);

describe('SetsCreateRoute', () => {
  it('should render route', async () => {
    await act(async () => renderSetCreateRoute());

    const setMameInput = screen.getByRole('textbox', { name: /sets.edit.field.name/ });
    const activeCheckboxes = screen.getAllByRole('checkbox', { name: /field.name.ariaLabel/ });
    const valueSelects = screen.getAllByRole('combobox', { name: /field.value.ariaLabel/ });
    const annexOption = screen.getByRole('option', { name: 'Annex' });
    const saveButton = screen.getByRole('button', { name: /saveAndClose/ });

    user.type(setMameInput, 'test name');
    user.click(activeCheckboxes[0]);
    user.selectOptions(valueSelects[0], annexOption);
    user.click(saveButton);

    expect(mutatorMock.createSets.POST).toBeCalled();
  });
});
