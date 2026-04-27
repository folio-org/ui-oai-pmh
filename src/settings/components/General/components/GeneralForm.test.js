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

const renderGeneralForm = (props = {}) => renderWithRouter(
  <GeneralForm
    stripes={stripes}
    onSubmit={onSubmitMock}
    label={labelText}
    {...props}
  />
);

describe('General form', () => {
  afterEach(() => {
    useConfiguration.mockClear();
  });

  describe('when OAI service is disabled', () => {
    beforeEach(() => {
      useConfiguration.mockReturnValue({
        config: undefined,
        isConfigsLoading: false,
      });
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

    it('should show disabled tooltip for disabled fields', () => {
      renderGeneralForm();

      expect(screen.getAllByText(/general.tooltip.fieldDisabled/).length).toBeGreaterThan(0);
    });

    it('should render oai notification', () => {
      renderGeneralForm();

      expect(screen.getByTestId('oai-notification')).toBeInTheDocument();
    });

    it('should disable text fields when service is disabled', () => {
      renderGeneralForm();

      expect(screen.getByRole('textbox', { name: /general.label.repositoryName/ })).toBeDisabled();
      expect(screen.getByRole('textbox', { name: /general.label.baseUrl/ })).toBeDisabled();
      expect(screen.getByRole('textbox', { name: /general.label.administratorEmail/ })).toBeDisabled();
    });

    it('should render with no axe errors', async () => {
      renderGeneralForm();

      await runAxeTest({
        rootNode: document.body,
      });
    });
  });

  describe('when initialValues are not provided and config indicates service is enabled', () => {
    beforeEach(() => {
      useConfiguration.mockReturnValue({
        config: {
          configValue: { enableOaiService: true },
        },
        isConfigsLoading: false,
      });
    });

    it('should not render oai notification', () => {
      renderGeneralForm();

      expect(screen.queryByTestId('oai-notification')).not.toBeInTheDocument();
    });
  });

  describe('when OAI service is enabled', () => {
    beforeEach(() => {
      useConfiguration.mockReturnValue({
        config: {
          configValue: { enableOaiService: true },
        },
        isConfigsLoading: false,
      });
    });

    it('should be presented repository name tooltip', () => {
      renderGeneralForm({ initialValues: { enableOaiService: true } });

      expect(screen.getByText(/general.tooltip.repositoryName/)).toBeInTheDocument();
    });

    it('should be presented base url tooltip', () => {
      renderGeneralForm({ initialValues: { enableOaiService: true } });

      expect(screen.getByText(/general.tooltip.baseUrl/)).toBeInTheDocument();
    });

    it('should be presented time granularity tooltip', () => {
      renderGeneralForm({ initialValues: { enableOaiService: true } });

      expect(screen.getByText(/settings.general.tooltip.timeGranularity/)).toBeInTheDocument();
    });

    it('should be presented administrator email tooltip', () => {
      renderGeneralForm({ initialValues: { enableOaiService: true } });

      expect(screen.getByText(/general.tooltip.administratorEmail/)).toBeInTheDocument();
    });

    it('should not render oai notification', () => {
      renderGeneralForm({ initialValues: { enableOaiService: true } });

      expect(screen.queryByTestId('oai-notification')).not.toBeInTheDocument();
    });

    it('should enable text fields when service is enabled', () => {
      renderGeneralForm({ initialValues: { enableOaiService: true } });

      expect(screen.getByRole('textbox', { name: /general.label.repositoryName/ })).toBeEnabled();
      expect(screen.getByRole('textbox', { name: /general.label.baseUrl/ })).toBeEnabled();
      expect(screen.getByRole('textbox', { name: /general.label.administratorEmail/ })).toBeEnabled();
    });

    it('should show validate message', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
        }))
      });

      renderGeneralForm({ initialValues: { enableOaiService: true } });

      const baseUrlInput = screen.getByRole('textbox', { name: /general.label.baseUrl/ });
      const adminEmailInput = screen.getByRole('textbox', { name: /general.label.administratorEmail/ });

      userEvent.type(baseUrlInput, 'http://test.com');
      userEvent.type(adminEmailInput, 'test@test.com');

      const alerts = screen.queryAllByRole('alert');

      expect(alerts.length).toBeGreaterThanOrEqual(0);
    });

    it('should render with no axe errors', async () => {
      renderGeneralForm({ initialValues: { enableOaiService: true } });

      await runAxeTest({
        rootNode: document.body,
      });
    });
  });
});
