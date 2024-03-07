import React from 'react';
import { screen, render } from '@testing-library/react';

import { ConfigManager } from '@folio/stripes/smart-components';
import { runAxeTest } from '@folio/stripes-testing';

import '../../../../test/jest/__mock__';
import General from './General';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  withStripes: jest.fn((chidren) => chidren),
}));

const getInitialValuesMock = () => jest.fn().mockReturnValue({});

const renderGeneral = () => {
  render(<General
    stripes={{ connect: jest.fn().mockReturnValue(ConfigManager) }
  }
    getInitialValue={getInitialValuesMock}
  />);
};

describe('General', () => {
  it('should render General', () => {
    renderGeneral();

    expect(screen.getByText('ConfigManger')).toBeVisible();
  });

  it('should render with no axe errors', async () => {
    renderGeneral();

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
