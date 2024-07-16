import React from 'react';
import { waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { QueryClientProvider, QueryClient } from 'react-query';

import '@folio/stripes-acq-components/test/jest/__mock__';
import { runAxeTest } from '@folio/stripes-testing';

import Logs from './Logs';
import { useLogs } from '../../hooks/useLogs';
import { renderWithRouter } from '../../../../test/jest/helpers';

jest.mock('../../hooks/useLogs');

const queryClient = new QueryClient();

const renderLogs = () => {
  return renderWithRouter(
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en">
        <Logs />
      </IntlProvider>
    </QueryClientProvider>
  );
};

describe('Logs', () => {
  const mockLogs = [
    {
      startedDate: '2023-06-18T12:00:00.000Z',
      lastUpdatedDate: '2023-06-18T13:00:00.000Z',
      requestId: '1234',
      linkToErrorFile: 'error.log',
    },
  ];

  it('should show loading when logs are loading + title visible by default', () => {
    useLogs.mockReturnValue({
      logs: { requestMetadataCollection: [] },
      isLogsLoading: true,
    });

    const { getByText, container } = renderLogs();

    const loadingSpinner = container.getElementsByClassName('spinner');

    expect(getByText('ui-oai-pmh.settings.logs.title')).toBeInTheDocument();

    expect(loadingSpinner.length).toBeGreaterThan(0);
  });

  it('should show the correct columns when logs are not loading', async () => {
    useLogs.mockReturnValue({
      logs: { requestMetadataCollection: mockLogs },
      isLogsLoading: false,
    });

    const { getByText } = renderLogs();

    await waitFor(() => {
      expect(getByText('ui-oai-pmh.settings.logs.columns.started')).toBeInTheDocument();
      expect(getByText('ui-oai-pmh.settings.logs.columns.lastUpdate')).toBeInTheDocument();
      expect(getByText('ui-oai-pmh.settings.logs.columns.harvestId')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText('1234')).toBeInTheDocument();
      expect(getByText('ui-oai-pmh.settings.logs.download')).toBeInTheDocument();
    });
  });

  it('should handle no logs', async () => {
    useLogs.mockReturnValue({
      logs: { requestMetadataCollection: [] },
      isLogsLoading: false,
    });

    const { queryByText } = renderLogs();

    await waitFor(() => {
      expect(queryByText('1234')).toBeNull();
    });
  });

  it('should not show download links if there are no links', async () => {
    useLogs.mockReturnValue({
      logs: { requestMetadataCollection: mockLogs.map(i => ({ ...i, linkToErrorFile: '' })) },
      isLogsLoading: false,
    });

    const { queryByText } = renderLogs();

    await waitFor(() => {
      expect(queryByText('ui-oai-pmh.settings.logs.download')).toBeNull();
    });
  });

  it('should render with no axe errors', async () => {
    useLogs.mockReturnValue({
      logs: { requestMetadataCollection: mockLogs.map(i => ({ ...i, linkToErrorFile: '' })) },
      isLogsLoading: false,
    });

    renderLogs();

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
