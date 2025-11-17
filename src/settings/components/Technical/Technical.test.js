import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';

import '../../../../test/jest/__mock__';
import { runAxeTest } from '@folio/stripes-testing';
import { useConfigurationManager } from '../../hooks';
import Technical from './Technical';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useConfigurationManager: jest.fn(),
}));

jest.mock('./components/TechnicalForm', () => {
  return function MockTechnicalForm({ label, onSubmit }) {
    return (
      <div data-testid="technical-form">
        <h1>{label}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ test: 'data' });
          }}
        >
          <button type="submit">Save</button>
        </form>
      </div>
    );
  };
});

const mockConfig = {
  id: '2',
  configValue: {
    maxRecordsPerResponse: 100,
    enableValidation: true,
    formattedOutput: false,
  },
};

const mockHandleSubmit = jest.fn();

describe('Technical Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Technical component', async () => {
    useConfigurationManager.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
      handleSubmit: mockHandleSubmit,
      stripes: { hasPerm: jest.fn(() => true) },
    });

    render(<Technical />);

    await waitFor(() => {
      expect(screen.getByTestId('technical-form')).toBeInTheDocument();
    });
  });

  it('should display loading pane when loading', async () => {
    useConfigurationManager.mockReturnValue({
      config: null,
      isConfigsLoading: true,
      handleSubmit: mockHandleSubmit,
      stripes: { hasPerm: jest.fn(() => true) },
    });

    render(<Technical />);

    await waitFor(() => {
      expect(screen.queryByTestId('technical-form')).not.toBeInTheDocument();
    });
  });

  it('should pass correct config name to useConfigurationManager', async () => {
    useConfigurationManager.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
      handleSubmit: mockHandleSubmit,
      stripes: { hasPerm: jest.fn(() => true) },
    });

    render(<Technical />);

    await waitFor(() => {
      expect(useConfigurationManager).toHaveBeenCalledWith('technical');
    });
  });

  it('should handle missing config gracefully', async () => {
    useConfigurationManager.mockReturnValue({
      config: null,
      isConfigsLoading: false,
      handleSubmit: mockHandleSubmit,
      stripes: { hasPerm: jest.fn(() => true) },
    });

    render(<Technical />);

    await waitFor(() => {
      expect(screen.getByTestId('technical-form')).toBeInTheDocument();
    });
  });

  it('should render with no axe errors', async () => {
    useConfigurationManager.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
      handleSubmit: mockHandleSubmit,
      stripes: { hasPerm: jest.fn(() => true) },
    });

    render(<Technical />);

    await runAxeTest({
      rootNode: document.body,
    });
  });
});

