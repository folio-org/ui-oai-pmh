import React from 'react';
import { screen, render } from '@testing-library/react';

import { runAxeTest } from '@folio/stripes-testing';

import '../../../../test/jest/__mock__';
import Behavior from './Behavior';


const renderBehavior = () => {
  render(<Behavior />);
};

describe('Behavior', () => {
  it('should render Behavior', () => {
    renderBehavior();

    expect(screen.getByText('ConfigManger')).toBeVisible();
  });

  it('should render with no axe errors', async () => {
    renderBehavior();

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
