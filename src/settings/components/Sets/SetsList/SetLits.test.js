import React from 'react';
import { screen } from '@testing-library/react';

import '../../../../../test/jest/__mock__';

import { StripesContext } from '@folio/stripes-core/src/StripesContext';
import buildStripes from '../../../../../test/jest/__mock__/stripesCore.mock';
import { renderWithRouter } from '../../../../../test/jest/helpers';
import SetsList from './SetsList';

const STRIPES = buildStripes();

const sets = [
  { createdByUserId: 'f6155b79-03c5-5a3e-ab66-95e4ad417430',
    createdDate: '2021-09-29T06:35:06.919+00:00',
    description: 'test description',
    filteringConditions: [
      { name: 'location',
        setSpec: 'Loc_Ann',
        value: 'Annex' }
    ],
    id: 'c9491f89-883c-48a7-a70f-1f15fe1073f9',
    name: 'test name',
    setSpec: 'Loc_Ann',
    updatedByUserId: 'f6155b79-03c5-5a3e-ab66-95e4ad417430',
    updatedDate: '2021-09-29T06:35:06.919+00:00' }
];

const onRowClickMock = jest.fn();
const onNeedMoreDataMock = jest.fn();

const renderSetList = (totalCount) => {
  renderWithRouter(
    <StripesContext.Provider value={STRIPES}>
      <SetsList
        sets={sets}
        onRowClick={onRowClickMock}
        onNeedMoreData={onNeedMoreDataMock}
        totalCount={totalCount}
      >
        <div data-testid="setList-child">Child component</div>
      </SetsList>
    </StripesContext.Provider>
  );
};

describe('Sets list', () => {
  it('should show epmty list', () => {
    renderSetList(0);

    expect(screen.getByText(/settings.sets.list.no.sets/)).toBeVisible();
  });

  it('should be correct pane header title', () => {
    renderSetList(1);

    expect(screen.getByText(/sets.list.title/)).toBeVisible();
  });

  it('should be correct label text for tabel', () => {
    renderSetList(1);

    const labels = [
      /settings.sets.list.field.name/,
      /settings.sets.list.field.setSpec/,
      /settings.sets.list.field.description/,
      'ui-oai-pmh.settings.sets.list.field.updatedDate',
    ];

    labels.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should be correct text in Content fields', () => {
    renderSetList(1);

    const setContent = [
      'test name',
      'test description',
      'Loc_Ann',
      'ui-oai-pmh.settings.sets.list.field.updatedDatePattern'

    ];

    setContent.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });
});
