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
      'ui-oai-pmh.settings.title',
      'ui-oai-pmh.settings.general.title',
      'ui-oai-pmh.settings.technical.title',
      'ui-oai-pmh.settings.behavior.title',
      'ui-oai-pmh.settings.sets.title'
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
