import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import '../../../test/jest/__mock__/index';

import SetsRoute from '.';

const match = {
  isExact: true,
  params: {},
  path:'/settings/oai-pmh/sets',
  url: '/settings/oai-pmh/sets'
};

jest.mock('./sets', () => ({
  ...jest.requireActual('./sets'),
  SetsRootLayer: jest.fn(({ children }) => {
    return children.props.children.map((el) => (<div>{el.props.path}</div>));
  })
}));

const renderSetsRouter = () => render(
  <MemoryRouter initialEntries={['/create']}>
    <SetsRoute match={match} />
  </MemoryRouter>
);

describe('Tests for Sets Router', () => {
  it('Should render page header and HomePage on default route', () => {
    renderSetsRouter();

    const routes = [
      '/settings/oai-pmh/sets/create',
      '/settings/oai-pmh/sets/:id/edit',
      '/settings/oai-pmh/sets/:id/duplicate',
      '/settings/oai-pmh/sets'
    ];

    routes.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });
});
