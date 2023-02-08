import React from 'react';
import { screen, render } from '@testing-library/react';

import '../test/jest/__mock__';

import OaiPmh from '.';

const renderOaiPhmSettings = () => render(
  <OaiPmh stripes={{ hasPerm: jest.fn().mockReturnValue(true) }} />
);

describe('OaiPhmSettings', () => {
  it('shoud show correct panel titles', () => {
    renderOaiPhmSettings();

    const titles = [
      /settings.title/,
      /settings.general.title/,
      /settings.technical.title/,
      /settings.behavior.title/,
    ];

    titles.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('shoud show correct routes', () => {
    renderOaiPhmSettings();

    const routes = [
      'general',
      'technical',
      'behavior',
    ];

    routes.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });
});
