import React from 'react';
import { screen, render } from '@testing-library/react';

import '../../test/jest/__mock__';

import OaiPmhSettings from '.';

const locationMock = {
  pathname: 'pathname',
  search: '',
  hash: '',
};

const stripesMock = {
  config:{
    platformName: 'Data-export'
  }
};

const renderOaiPhmSettings = () => render(
  <OaiPmhSettings location={locationMock} stripes={stripesMock} />
);

describe('OaiPhmSettings', () => {
  it('should show correct panel titles', () => {
    renderOaiPhmSettings();

    const titles = [
      /settings.title/,
      /settings.general.title/,
      /settings.technical.title/,
      /settings.behavior.title/,
    ];

    titles.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should show correct routes', () => {
    renderOaiPhmSettings();

    const routes = [
      'general',
      'technical',
      'behavior',
    ];

    routes.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });
});
