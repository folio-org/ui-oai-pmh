import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { runAxeTest } from '@folio/stripes-testing';

import '../../../../../test/jest/__mock__';
import { renderWithRouter, initialValues, filterOptions } from '../../../../../test/jest/helpers';
import SetsForm from './SetsForm';

const handleSubmitMock = jest.fn();
const stripes = {
  hasPerm: () => true
};

const formTitle = () => 'testTitle';
const onBackMock = jest.fn();

const renderSetForm = () => {
  renderWithRouter(
    <SetsForm
      pristine
      submitting
      stripes={stripes}
      initialValues={initialValues}
      formTitle={formTitle}
      onBack={onBackMock}
      filteringConditionsDataOptions={filterOptions}
      onSubmit={handleSubmitMock}
    />
  );
};

describe('Sets form', () => {
  it('should be correct title', () => {
    renderSetForm();

    expect(screen.getByText('testTitle')).toBeVisible();
  });

  it('should be correct label text for specification', () => {
    renderSetForm();

    expect(screen.getByText(/sets.edit.field.setSpecification/)).toBeVisible();
  });

  it('should be correct label text for edit field', () => {
    renderSetForm();

    expect(screen.getByText(/sets.edit.field.name/)).toBeVisible();
  });

  it('should be correct label text for description field', () => {
    renderSetForm();

    expect(screen.getByText(/sets.edit.field.description/)).toBeVisible();
  });

  it('should show filter conditions', () => {
    renderSetForm();

    const filterCondtions = [
      /sets.edit.filteringConditions.field.name/,
      /sets.edit.filteringConditions.field.active/,
      /sets.edit.filteringConditions.field.value/,
      /sets.edit.filteringConditions.field.setSpec/
    ];

    filterCondtions.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should click on cancel button', () => {
    renderSetForm();

    userEvent.click(screen.getByRole('button', { name: 'stripes-core.button.cancel' }));

    expect(onBackMock).toHaveBeenCalled();
  });

  it('should show new name in Description field', () => {
    renderSetForm();

    userEvent.type(screen.getByRole('textbox', { name: /sets.edit.field.description/ }), 'new description');

    expect(screen.getByRole('textbox', { name: /sets.edit.field.description/ })).toHaveValue('new description');
  });

  it('should render with no axe errors', async () => {
    renderSetForm();

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
