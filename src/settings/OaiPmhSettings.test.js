import React from 'react';
import { screen } from '@testing-library/react';

import '../../test/jest/__mock__';
import { renderWithRouter } from '../../test/jest/helpers';
import OaiPmhSettings from '.';

const stripesMock = {
  config:{
    platformName: 'Data-export'
  }
};

const renderOaiPhmSettings = (location) => renderWithRouter(
  <OaiPmhSettings location={location} stripes={stripesMock} />
);

describe('OaiPhmSettings', () => {
  it('should show correct panel titles', () => {
    const locationMock = {
      pathname: 'pathname',
      search: '',
      hash: '',
    };
    renderOaiPhmSettings(locationMock);

    const titles = [
      /settings.title/,
      /settings.general.title/,
      /settings.technical.title/,
      /settings.behavior.title/,
    ];

    titles.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should show correct routes', () => {
    const locationMock = {
      pathname: 'pathname',
      search: '',
      hash: '',
    };
    renderOaiPhmSettings(locationMock);

    const routes = [
      'general',
      'technical',
      'behavior',
    ];

    routes.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should show behavior title', () => {
    const locationMock = {
      pathname: 'pathname/behavior',
      search: '',
      hash: '',
    };

    renderOaiPhmSettings(locationMock);

    const routes = [
      'general',
      'technical',
      'behavior',
    ];

    routes.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should show technical title', () => {
    const locationMock = {
      pathname: 'pathname/technical',
      search: '',
      hash: '',
    };

    renderOaiPhmSettings(locationMock);

    const routes = [
      'general',
      'technical',
      'behavior',
    ];

    routes.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should show general title', () => {
    const locationMock = {
      pathname: 'pathname/general',
      search: '',
      hash: '',
    };

    renderOaiPhmSettings(locationMock);

    const routes = [
      'general',
      'technical',
      'behavior',
    ];

    routes.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should show logs title', () => {
    const locationMock = {
      pathname: 'pathname/logs',
      search: '',
      hash: '',
    };

    renderOaiPhmSettings(locationMock);

    const routes = [
      'general',
      'technical',
      'behavior',
    ];

    routes.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should show sets title', () => {
    const locationMock = {
      pathname: 'pathname/sets',
      search: '',
      hash: '',
    };

    renderOaiPhmSettings(locationMock);

    const routes = [
      'general',
      'technical',
      'behavior',
    ];

    routes.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });
});
