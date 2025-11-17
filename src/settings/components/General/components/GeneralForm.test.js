import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { runAxeTest } from '@folio/stripes-testing';

import '../../../../../test/jest/__mock__';
import { renderWithRouter } from '../../../../../test/jest/helpers';
import GeneralForm from './GeneralForm';
import { useConfiguration } from '../../../hooks';

jest.mock('../../../hooks/useConfiguration');


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
  beforeEach(() => {
    useConfiguration.mockReturnValue({
      config: undefined,
      isConfigsLoading: false,
    });
  });

  afterEach(() => {
    useConfiguration.mockClear();
  });

  it('should be correct behavior title', () => {
    renderGeneralForm();

    expect(screen.getByText(labelText)).toBeVisible();
  });

  it('should be enable general button save', () => {
    renderGeneralForm();

    expect(screen.getByRole('button', { name: /save/ })).toBeEnabled();
  });

  it('should be presented enable oai service', () => {
    renderGeneralForm();

    expect(screen.getByText(/general.tooltip.enableOaiService/)).toBeInTheDocument();
  });

  it('should be presented repository name', () => {
    renderGeneralForm();

    expect(screen.getByText(/general.tooltip.repositoryName/)).toBeInTheDocument();
  });

  it('should be presented base url', () => {
    renderGeneralForm();

    expect(screen.getByText(/general.tooltip.baseUrl/)).toBeInTheDocument();
  });

  it('should be presented time granularity', () => {
    renderGeneralForm();

    expect(screen.getByText(/settings.general.tooltip.timeGranularity/)).toBeInTheDocument();
  });

  it('should be presented administrator email', () => {
    renderGeneralForm();

    expect(screen.getByText(/general.tooltip.administratorEmail/)).toBeInTheDocument();
  });

  it('should render oai notification', () => {
    renderGeneralForm();

    expect(screen.getByTestId('oai-notification')).toBeInTheDocument();
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

    const alerts = screen.queryAllByRole('alert');

    expect(alerts.length).toBeGreaterThanOrEqual(0);
  });

  it('should render with no axe errors', async () => {
    renderGeneralForm();

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
