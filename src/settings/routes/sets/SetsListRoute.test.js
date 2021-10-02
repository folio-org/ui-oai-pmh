import React, { useState as useStateMock } from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import '../../../../test/jest/__mock__';

import SetsListRoute from './SetsListRoute';
import SetList from '../../components/Sets/SetsList/SetsList';

jest.mock('../../components/Sets/SetsList/SetsList', () => {
  return jest.fn(() => <div>SetsList</div>);
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const locationMock = {
  pathname: '/settings/oai-pmh/sets',
  hash: ''
};

const mutatorMock = {
  setsRecords: {
    GET: jest.fn(() => Promise.resolve({
      limit: 100,
      offset: 1,
    }))
  }
};

const childrenMock = () => <div>TextForm</div>;

const renderSetListRoute = (
  history,
  mutator = mutatorMock,
) => {
  return render(
    <SetsListRoute
      history={history}
      mutator={mutator}
      location={locationMock}
    >
      {childrenMock}
    </SetsListRoute>
  );
};

describe('SetsListRoute component', () => {
  let history;
  const setState = jest.fn();

  beforeEach(() => {
    SetList.mockClear();
    history = createMemoryHistory();
    useStateMock.mockImplementation(init => [init, setState]);
  });

  it('should show SetsList', () => {
    renderSetListRoute(history, mutatorMock, childrenMock);

    expect(screen.getByText('SetsList')).toBeVisible();
  });
});
