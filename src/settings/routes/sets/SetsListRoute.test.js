import React from 'react';
import { screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../../../../test/jest/__mock__';

import SetsListRoute from './SetsListRoute';
import { useSets } from '../../hooks/useSets';
import { renderWithRouter } from '../../../../test/jest/helpers';

jest.mock('../../components/Sets/SetsList/SetsList', () => {
  return jest.fn(() => <div>SetsList</div>);
});

jest.mock('../../hooks/useSets');


const childrenMock = () => <div>TextForm</div>;

const queryClient = new QueryClient();

const renderSetListRoute = () => {
  return renderWithRouter(
    <QueryClientProvider client={queryClient}>
      <SetsListRoute>
        {childrenMock}
      </SetsListRoute>
    </QueryClientProvider>
  );
};

describe('SetsListRoute component', () => {
  beforeEach(() => {
    useSets.mockReturnValue({
      sets: [],
      totalRecords: 0,
      isSetsLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });
  });

  afterEach(() => {
    useSets.mockClear();
  });

  it('should show SetsList', () => {
    renderSetListRoute();

    expect(screen.getByText('SetsList')).toBeVisible();
  });
});
