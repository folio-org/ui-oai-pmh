import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../../../../test/jest/__mock__';

import { renderWithRouter } from '../../../../../test/jest/helpers';

import GeneralForm from './GeneralForm';

const stripes = {
  hasPerm: () => true
};

const onSubmitMock = jest.fn();
const labelText = 'ui-oai-pmh.settings.general.title';

const renderGeneralForm = () => renderWithRouter(
  <GeneralForm
    stripes={stripes}
    onSubmit={onSubmitMock}
    label={labelText}
  />
);

describe('General form', () => {
  it('should be correct behavior title', () => {
    renderGeneralForm();

    expect(screen.getByText(labelText)).toBeVisible();
  });

  it('should be enable general button save', () => {
    renderGeneralForm();

    expect(screen.getByRole('button')).toBeEnabled();
  });


  it('should be presented enable oai service', () => {
    renderGeneralForm();

    expect(screen.getByText(/general.tooltip.enableOaiService/)).toBeEnabled();
  });

  it('should be presented repository name', () => {
    renderGeneralForm();

    expect(screen.getByText(/general.tooltip.repositoryName/)).toBeEnabled();
  });

  it('should be presented base url', () => {
    renderGeneralForm();

    expect(screen.getByText(/general.tooltip.baseUrl/)).toBeEnabled();
  });

  it('should be presented time granularity', () => {
    renderGeneralForm();

    expect(screen.getByText(/settings.general.tooltip.timeGranularity/)).toBeEnabled();
  });

  it('should be presented administrator email', () => {
    renderGeneralForm();

    expect(screen.getByText(/general.tooltip.administratorEmail/)).toBeEnabled();
  });

  it('should be absent oai notification', () => {
    renderGeneralForm();

    expect(screen.getByTestId('oai-notification')).not.toHaveTextContent();
  });

  it('should show validate message', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
      }))
    });

    renderGeneralForm();

    const baseUrlInput = screen.getByRole('textbox', { name: /general.label.baseUrl/ });
    const adminEmailInput = screen.getByRole('textbox', { name: /general.label.administratorEmail/ });

    userEvent.type(baseUrlInput, 'http://test.com');
    userEvent.type(adminEmailInput, 'test@test.com');

    const alerts = screen.getAllByRole('alert');

    alerts.forEach((el) => expect(el).not.toHaveTextContent());
  });
});
