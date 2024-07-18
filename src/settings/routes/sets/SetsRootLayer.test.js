import React from 'react';
import { screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { renderWithRouter } from '../../../../test/jest/helpers';
import SetsRootLayer from './SetsRootLayer';
import { useFilteringConditions } from '../../hooks/useFilteringConditions';

jest.mock('../../hooks/useFilteringConditions');

const queryClient = new QueryClient();

const renderSetRootLayerRoute = () => (
  renderWithRouter(
    <QueryClientProvider client={queryClient}>
      <SetsRootLayer>
        <div data-testid="children-component">Children Component</div>
      </SetsRootLayer>
    </QueryClientProvider>
  )
);

describe('SetsRootLayer', () => {
  beforeEach(() => {
    useFilteringConditions.mockReturnValue({
      conditions: [],
      isFilteringConditionsLoading: false,
    });
  });

  afterEach(() => {
    useFilteringConditions.mockClear();
  });

  it('should render route', async () => {
    renderSetRootLayerRoute();

    expect(screen.getByTestId('children-component')).toBeVisible();
  });
});
