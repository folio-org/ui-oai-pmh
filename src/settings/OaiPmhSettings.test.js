import React from 'react';
import { screen, render } from '@testing-library/react';

import '../../test/jest/__mock__';

import OaiPmhSettings from '.';

const renderOaiPhmSettings = () => render(
  <OaiPmhSettings />
);

describe('OaiPhmSettings', () => {
  it('shoud show correct panel titles', () => {
    renderOaiPhmSettings();

    const titles = [
      /settings.title/,
      /settings.general.title/,
      /settings.technical.title/,
      /settings.behavior.title/,
      /settings.sets.title/
    ];

    titles.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('shoud show correct routes', () => {
    renderOaiPhmSettings();

    const routes = [
      'general',
      'technical',
      'behavior',
      'sets'
    ];

    routes.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });
});
