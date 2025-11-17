import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';

import '../../../../test/jest/__mock__';
import { runAxeTest } from '@folio/stripes-testing';
import { useConfigurationManager } from '../../hooks';
import General from './General';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useConfigurationManager: jest.fn(),
}));

jest.mock('./components/GeneralForm', () => {
  return function MockGeneralForm({ label, onSubmit }) {
    return (
      <div data-testid="general-form">
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
  id: '1',
  configValue: { test: 'value' },
};

const mockHandleSubmit = jest.fn();

describe('General Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render General component', async () => {
    useConfigurationManager.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
      handleSubmit: mockHandleSubmit,
      stripes: { hasPerm: jest.fn(() => true) },
    });

    render(<General />);

    await waitFor(() => {
      expect(screen.getByTestId('general-form')).toBeInTheDocument();
    });
  });

  it('should display loading pane when loading', async () => {
    useConfigurationManager.mockReturnValue({
      config: null,
      isConfigsLoading: true,
      handleSubmit: mockHandleSubmit,
      stripes: { hasPerm: jest.fn(() => true) },
    });

    render(<General />);

    await waitFor(() => {
      expect(screen.queryByTestId('general-form')).not.toBeInTheDocument();
    });
  });

  it('should pass correct config name to useConfigurationManager', async () => {
    useConfigurationManager.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
      handleSubmit: mockHandleSubmit,
      stripes: { hasPerm: jest.fn(() => true) },
    });

    render(<General />);

    await waitFor(() => {
      expect(useConfigurationManager).toHaveBeenCalledWith('general');
    });
  });

  it('should handle missing config gracefully', async () => {
    useConfigurationManager.mockReturnValue({
      config: null,
      isConfigsLoading: false,
      handleSubmit: mockHandleSubmit,
      stripes: { hasPerm: jest.fn(() => true) },
    });

    render(<General />);

    await waitFor(() => {
      expect(screen.getByTestId('general-form')).toBeInTheDocument();
    });
  });

  it('should render with no axe errors', async () => {
    useConfigurationManager.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
      handleSubmit: mockHandleSubmit,
      stripes: { hasPerm: jest.fn(() => true) },
    });

    render(<General />);

    await runAxeTest({
      rootNode: document.body,
    });
  });
});

