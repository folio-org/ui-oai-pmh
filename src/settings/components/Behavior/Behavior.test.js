import React from 'react';
import { screen, render } from '@testing-library/react';
import { ConfigManager } from '@folio/stripes/smart-components';

import '../../../../test/jest/__mock__';

import Behavior from './Behavior';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  withStripes: jest.fn((chidren) => chidren),
}));

const renderBehavior = () => {
  render(<Behavior stripes={{
    connect: jest.fn().mockReturnValue(ConfigManager)
  }}
  />);
};

describe('Behavior', () => {
  it('should render Behavior', () => {
    renderBehavior();

    expect(screen.getByText('ConfigManger')).toBeVisible();
  });
});
