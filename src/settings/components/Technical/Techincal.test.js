import React from 'react';

import { screen, render } from '@testing-library/react';
import { ConfigManager } from '@folio/stripes/smart-components';

import '../../../../test/jest/__mock__';

import Technical from '.';


jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  withStripes: jest.fn((chidren) => chidren),
}));

const renderTechnical = () => {
  render(<Technical stripes={{
    connect: jest.fn().mockReturnValue(ConfigManager)
  }}
  />);
};

describe('Technical', () => {
  it('should render Technical', () => {
    renderTechnical();

    expect(screen.getByText('ConfigManger')).toBeVisible();
  });
});
