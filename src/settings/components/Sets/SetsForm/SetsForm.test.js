import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../../../../test/jest/__mock__';
import { renderWithRouter } from '../../../../../test/jest/helpers';


import SetsForm from './SetsForm';

describe('Sets form', () => {
  const handleSubmitMock = jest.fn();
  const stripes = {
    hasPerm: () => true
  };
  const form = {
    change: jest.fn(),
    reset: jest.fn(),
  };
  const formTitle = () => 'testTitle';
  const onBackMock = jest.fn();
  const filterOptions = {
    name : 'location',
    values : ['Popular Reading Collection',
      'ORWIG ETHNO CD',
      'Main Library',
      'Online',
      'SECOND FLOOR',
      'Annex'],
  };

  const renderSetForm = () => {
    renderWithRouter(
      <SetsForm
        pristine
        submitting
        stripes={stripes}
        form={form}
        formTitle={formTitle}
        onBack={onBackMock}
        filteringConditionsDataOptions={filterOptions}
        onSubmit={handleSubmitMock}
      />
    );
  };

  it('should be correct title', () => {
    renderSetForm();

    expect(screen.getByText('testTitle')).toBeVisible();
  });

  it('should be correct label text for specification', () => {
    renderSetForm();

    expect(screen.getByText('ui-oai-pmh.settings.sets.edit.field.setSpecification')).toBeVisible();
  });

  it('should be correct label text for edit field', () => {
    renderSetForm();

    expect(screen.getByText('ui-oai-pmh.settings.sets.edit.field.name')).toBeVisible();
  });

  it('should be correct label text for description field', () => {
    renderSetForm();

    expect(screen.getByText('ui-oai-pmh.settings.sets.edit.field.description')).toBeVisible();
  });

  it('should show filter conditions', () => {
    renderSetForm();

    const filterCondtions = [
      'ui-oai-pmh.settings.sets.edit.filteringConditions.field.name',
      'ui-oai-pmh.settings.sets.edit.filteringConditions.field.active',
      'ui-oai-pmh.settings.sets.edit.filteringConditions.field.value',
      'ui-oai-pmh.settings.sets.edit.filteringConditions.field.setSpec'
    ];

    filterCondtions.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should click on cancel button', () => {
    renderSetForm();

    userEvent.click(screen.getByRole('button', { name:'stripes-core.button.cancel' }));

    expect(onBackMock).toHaveBeenCalled();
  });

  it('should show new name in Name input', () => {
    renderSetForm();

    userEvent.type(screen.getByRole('textbox', { name:'ui-oai-pmh.settings.sets.edit.field.name' }), 'new Name');

    expect(screen.getByRole('textbox', { name:'ui-oai-pmh.settings.sets.edit.field.name' })).toHaveValue('new Name');
  });

  it('should show new name in Description field', () => {
    renderSetForm();

    userEvent.type(screen.getByRole('textbox', { name:'ui-oai-pmh.settings.sets.edit.field.description' }), 'new description');

    expect(screen.getByRole('textbox', { name:'ui-oai-pmh.settings.sets.edit.field.description' })).toHaveValue('new description');
  });
});
