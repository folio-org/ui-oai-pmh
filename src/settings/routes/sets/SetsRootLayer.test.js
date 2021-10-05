import React from 'react';
import { screen, act } from '@testing-library/react';

import buildStripes from '../../../../test/jest/__mock__/stripesCore.mock';
import { renderWithRouter, setsFilteringConditions } from '../../../../test/jest/helpers';

import SetsRootLayer from './SetsRootLayer';

const STRIPES = buildStripes();

const mutatorMock = {
  setsFilteringConditions: {
    GET: jest.fn(() => Promise.resolve()).mockResolvedValue(setsFilteringConditions)
  }
};

const renderSetRootLayerRoute = (
  children,
  mutator = mutatorMock,
) => (
  renderWithRouter(
    <SetsRootLayer
      mutator={mutator}
      stripes={STRIPES}
    >
      {children}
    </SetsRootLayer>
  )
);

const childrenComponent = <div data-testid="children-component">Children Component</div>;
describe('SetsRootLayer', () => {
  it('should render route', async () => {
    await act(async () => renderSetRootLayerRoute(childrenComponent));

    expect(screen.getByTestId('children-component')).toBeVisible();
  });
});
