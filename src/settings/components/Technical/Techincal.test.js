import React from 'react';
import { screen, render } from '@testing-library/react';

import { runAxeTest } from '@folio/stripes-testing';

import '../../../../test/jest/__mock__';
import Technical from '.';


const renderTechnical = () => {
  render(<Technical />);
};

describe('Technical', () => {
  it('should render Technical', () => {
    renderTechnical();

    expect(screen.getByText('ConfigManger')).toBeVisible();
  });

  it('should render with no axe errors', async () => {
    renderTechnical();

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
