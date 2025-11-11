import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';

import '../../../../test/jest/__mock__';
import { runAxeTest } from '@folio/stripes-testing';
import { useConfigurationManager } from '../../hooks';
import Technical from '.';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useConfigurationManager: jest.fn(),
}));

jest.mock('./components/TechnicalForm', () => {
  return function MockTechnicalForm({ label, onSubmit, _initialValues }) {
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
      stripes: {},
    });

    render(<Technical />);

    await waitFor(() => {
      expect(screen.getByTestId('technical-form')).toBeInTheDocument();
    });
  });

  it('should render loading pane when loading', () => {
    useConfigurationManager.mockReturnValue({
      config: null,
      isConfigsLoading: true,
      handleSubmit: mockHandleSubmit,
      stripes: {},
    });

    render(<Technical />);

    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('should render with no axe errors', async () => {
    useConfigurationManager.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
      handleSubmit: mockHandleSubmit,
      stripes: {},
    });

    render(<Technical />);

    await waitFor(() => {
      expect(screen.getByTestId('technical-form')).toBeInTheDocument();
    });

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
