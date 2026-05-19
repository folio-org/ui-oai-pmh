import { renderHook } from '@testing-library/react-hooks';
import { useQuery } from 'react-query';

import { useOkapiKy, useNamespace } from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import '../../../test/jest/__mock__';

import { useConfiguration, OAI_CONFIGURATION } from './useConfiguration';

jest.mock('@folio/stripes-acq-components', () => ({
  useShowCallout: jest.fn(),
}));
jest.mock('react-query');
jest.mock('@folio/stripes/core', () => ({
  useOkapiKy: jest.fn(),
  useNamespace: jest.fn(),
}));

describe('useConfiguration', () => {
  const mockKy = {
    get: jest.fn(),
  };

  const mockNamespaceKey = 'test-namespace';
  const mockConfigName = 'general';
  const mockShowCallout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useOkapiKy.mockReturnValue(mockKy);
    useNamespace.mockReturnValue([mockNamespaceKey]);
    useShowCallout.mockReturnValue(mockShowCallout);
  });

  const mockUseQueryWithData = (rawData, isLoading = false) => {
    useQuery.mockImplementation(({ select }) => {
      const selectedData = select && rawData ? select(rawData) : rawData;
      return {
        data: selectedData,
        isLoading,
      };
    });
  };

  it('should return initial state', () => {
    mockUseQueryWithData(undefined, true);

    const { result } = renderHook(() => useConfiguration(mockConfigName));

    expect(result.current.config).toStrictEqual({ configValue: {} });
    expect(result.current.isConfigsLoading).toBe(true);
  });

  it('should call useNamespace with OAI_CONFIGURATION key', () => {
    mockUseQueryWithData(undefined, true);

    renderHook(() => useConfiguration(mockConfigName));

    expect(useNamespace).toHaveBeenCalledWith({ key: OAI_CONFIGURATION });
  });

  it('should call useQuery with correct parameters', () => {
    mockUseQueryWithData({ configurationSettings: [] }, true);

    renderHook(() => useConfiguration(mockConfigName));

    const callArgs = useQuery.mock.calls[0][0];
    expect(callArgs.queryKey).toEqual([mockNamespaceKey, mockConfigName]);
    expect(callArgs.enabled).toBe(true);
  });

  it('should disable query when configName is not provided', () => {
    mockUseQueryWithData({ configurationSettings: [] }, false);

    renderHook(() => useConfiguration(null));

    const callArgs = useQuery.mock.calls[0][0];
    expect(callArgs.enabled).toBe(false);
  });

  it('should return config data when query succeeds', async () => {
    const mockConfig = {
      id: '1',
      configName: mockConfigName,
      configValue: { key: 'value' },
    };

    mockUseQueryWithData({
      configurationSettings: [mockConfig],
    }, false);

    const { result } = renderHook(() => useConfiguration(mockConfigName));

    expect(result.current.config).toEqual(mockConfig);
    expect(result.current.isConfigsLoading).toBe(false);
  });

  it('should find and return the correct configuration from array', async () => {
    const mockGeneralConfig = {
      id: '1',
      configName: 'general',
      configValue: { key: 'general-value' },
    };

    const mockTechnicalConfig = {
      id: '2',
      configName: 'technical',
      configValue: { key: 'technical-value' },
    };

    mockUseQueryWithData({
      configurationSettings: [mockGeneralConfig, mockTechnicalConfig],
    }, false);

    const { result } = renderHook(() => useConfiguration('technical'));

    expect(result.current.config).toEqual(mockTechnicalConfig);
  });

  it('should return undefined if configuration is not found', async () => {
    mockUseQueryWithData({
      configurationSettings: [
        {
          id: '1',
          configName: 'general',
          configValue: { key: 'value' },
        },
      ],
    }, false);

    const { result } = renderHook(() => useConfiguration('nonexistent'));

    expect(result.current.config).toStrictEqual({ configValue: {} });
  });

  it('should call ky.get with correct parameters', () => {
    mockUseQueryWithData({ configurationSettings: [] }, true);

    renderHook(() => useConfiguration(mockConfigName));

    const callArgs = useQuery.mock.calls[0][0];
    expect(typeof callArgs.queryFn).toBe('function');
  });

  it('should return loading state correctly', () => {
    mockUseQueryWithData({ configurationSettings: [] }, false);

    const { result } = renderHook(() => useConfiguration(mockConfigName));

    expect(result.current.isConfigsLoading).toBe(false);
  });

  it('should disable refetchOnWindowFocus to prevent spurious errors during affiliation switch', () => {
    mockUseQueryWithData({ configurationSettings: [] }, false);

    renderHook(() => useConfiguration(mockConfigName));

    const callArgs = useQuery.mock.calls[0][0];
    expect(callArgs.refetchOnWindowFocus).toBe(false);
  });

  describe('onError callback', () => {
    beforeEach(() => {
      mockUseQueryWithData({ configurationSettings: [] }, false);
      renderHook(() => useConfiguration(mockConfigName));
    });

    it('should not show callout for AbortError', () => {
      const { onError } = useQuery.mock.calls[0][0];
      const abortError = Object.assign(new Error('The user aborted a request.'), { name: 'AbortError' });

      onError(abortError);

      expect(mockShowCallout).not.toHaveBeenCalled();
    });

    it('should show error callout for non-abort errors', () => {
      const { onError } = useQuery.mock.calls[0][0];

      onError(new Error('Network error'));

      expect(mockShowCallout).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' })
      );
    });

    it('should show error callout when error has no name property', () => {
      const { onError } = useQuery.mock.calls[0][0];

      onError(null);

      expect(mockShowCallout).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' })
      );
    });
  });
});

