import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { runAxeTest } from '@folio/stripes-testing';

import { renderWithRouter } from '../../../../../test/jest/helpers';
import '../../../../../test/jest/__mock__';
import TechnicalForm from './TechnicalForm';
import { useConfiguration } from '../../../hooks';

const onSubmitMock = jest.fn();
const labelText = 'ui-oai-pmh.settings.technical.title';

jest.mock('../../../hooks/useConfiguration');

const renderTechincalForm = () => renderWithRouter(
  <TechnicalForm
    onSubmit={onSubmitMock}
    label={labelText}
  />
);

describe('Technical form', () => {
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
      renderTechincalForm();

      expect(screen.getByText(labelText)).toBeVisible();
    });

    it('should be presented right techincal labels', () => {
      renderTechincalForm();

      const labels = [
        /settings.technical.label.maxRecordsPerResponse/,
        /settings.technical.label.enableValidation/,
        /settings.technical.label.formattedOutput/,
      ];

      labels.forEach((el) => expect(screen.getByText(el)).toBeVisible());
    });

    it('should show disabled tooltip instead of regular tooltips', () => {
      renderTechincalForm();

      expect(screen.getAllByText(/nonGeneral.tooltip.fieldDisabled/).length).toBeGreaterThan(0);
    });

    it('should render oai notification', () => {
      renderTechincalForm();

      expect(screen.getByTestId('oai-notification')).toBeInTheDocument();
    });

    it('should disable fields when service is disabled', () => {
      renderTechincalForm();

      expect(screen.getByRole('textbox', { name: /technical.label.maxRecordsPerResponse/ })).toBeDisabled();
      expect(screen.getByRole('checkbox', { name: /technical.label.enableValidation/ })).toBeDisabled();
      expect(screen.getByRole('checkbox', { name: /technical.label.formattedOutput/ })).toBeDisabled();
    });

    it('should render with no axe errors', async () => {
      renderTechincalForm();

      await runAxeTest({
        rootNode: document.body,
      });
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

    it('should be presented right techincal tooltips', () => {
      renderTechincalForm();

      const tooltips = [
        /technical.tooltip.maxRecordsPerResponse/,
        /technical.tooltip.enableValidation/,
        /technical.tooltip.formattedOutput/,
      ];

      tooltips.forEach((el) => expect(screen.getByText(el)).toBeVisible());
    });

    it('should not render oai notification', () => {
      renderTechincalForm();

      expect(screen.queryByTestId('oai-notification')).not.toBeInTheDocument();
    });

    it('should enable fields when service is enabled', () => {
      renderTechincalForm();

      expect(screen.getByRole('textbox', { name: /technical.label.maxRecordsPerResponse/ })).toBeEnabled();
      expect(screen.getByRole('checkbox', { name: /technical.label.enableValidation/ })).toBeEnabled();
      expect(screen.getByRole('checkbox', { name: /technical.label.formattedOutput/ })).toBeEnabled();
    });

    it('should be enabled button save after checking the formatted output', () => {
      renderTechincalForm();

      userEvent.click(screen.getByRole('checkbox', { name: /technical.label.formattedOutput/ }));

      expect(screen.getByRole('button', { name: 'stripes-core.button.save' })).toBeEnabled();
    });

    it('should be enabled button save after setting max record', () => {
      renderTechincalForm();

      userEvent.type(screen.getByRole('textbox', { name: /technical.label.maxRecordsPerResponse/ }), '50');

      expect(screen.getByRole('button', { name: 'stripes-core.button.save' })).toBeEnabled();
    });

    it('should render with no axe errors', async () => {
      renderTechincalForm();

      await runAxeTest({
        rootNode: document.body,
      });
    });
  });
});
