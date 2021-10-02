import React from 'react';
import { screen, render } from '@testing-library/react';
import { ConfigManager } from '@folio/stripes/smart-components';

import '../../../../test/jest/__mock__';

import General from './General';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  withStripes: jest.fn((chidren) => chidren),
}));

const getInitialValuesMock = () => jest.fn().mockReturnValue({});

describe('General', () => {
  it('should render General', () => {
    render(<General
      stripes={{ connect: jest.fn().mockReturnValue(ConfigManager) }
    }
      getInitialValue={getInitialValuesMock}
    />);

    expect(screen.getByText('ConfigManger')).toBeVisible();
  });
});
