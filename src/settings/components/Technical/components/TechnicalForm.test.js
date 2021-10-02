import React from 'react';
import '../../../../../test/jest/__mock__';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '../../../../../test/jest/helpers';

import TechnicalForm from './TechnicalForm';

const stripes = {
  hasPerm: () => true
};

const onSubmitMock = jest.fn();
const labelText = 'ui-oai-pmh.settings.technical.title';

const renderTechincalForm = () => renderWithRouter(
  <TechnicalForm
    stripes={stripes}
    onSubmit={onSubmitMock}
    label={labelText}
  />
);

describe('Technical settings page', () => {
  it('should be correct behavior title', () => {
    renderTechincalForm();

    expect(screen.getByText(labelText)).toBeVisible();
  });

  it('should be presented right techincal labels', () => {
    renderTechincalForm();

    const labels = [
      'ui-oai-pmh.settings.technical.label.maxRecordsPerResponse',
      'ui-oai-pmh.settings.technical.label.enableValidation',
      'ui-oai-pmh.settings.technical.label.formattedOutput',
    ];

    labels.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should be presented right techincal tooltips', () => {
    renderTechincalForm();

    const tooltips = [
      'ui-oai-pmh.settings.technical.tooltip.maxRecordsPerResponse',
      'ui-oai-pmh.settings.technical.tooltip.enableValidation',
      'ui-oai-pmh.settings.technical.tooltip.formattedOutput',
    ];

    tooltips.forEach((el) => expect(screen.getByText(el)).toBeVisible());
  });

  it('should be enabled button save after checking the formatted output', () => {
    renderTechincalForm();


    userEvent.click(screen.getByRole('checkbox', { name:'ui-oai-pmh.settings.technical.label.formattedOutput' }));

    expect(screen.getByRole('button', { name: 'stripes-core.button.save' })).toBeEnabled();
  });

  it('should be enabled button save after setting max record', () => {
    renderTechincalForm();


    userEvent.type(screen.getByRole('textbox', { name:'ui-oai-pmh.settings.technical.label.maxRecordsPerResponse' }), '50');

    expect(screen.getByRole('button', { name: 'stripes-core.button.save' })).toBeEnabled();
  });
});
