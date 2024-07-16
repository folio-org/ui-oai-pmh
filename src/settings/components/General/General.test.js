import React from 'react';
import { screen, render } from '@testing-library/react';

import '../../../../test/jest/__mock__';
import { runAxeTest } from '@folio/stripes-testing';
import General from './General';


const renderGeneral = () => {
  render(<General />);
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
