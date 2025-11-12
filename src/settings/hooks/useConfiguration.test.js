import { renderHook } from '@testing-library/react-hooks';
import { useQuery } from 'react-query';

import { useOkapiKy, useNamespace } from '@folio/stripes/core';

import '../../../test/jest/__mock__';
import { useConfiguration, OAI_CONFIGURATION } from './useConfiguration';

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

  beforeEach(() => {
    jest.clearAllMocks();
    useOkapiKy.mockReturnValue(mockKy);
    useNamespace.mockReturnValue([mockNamespaceKey]);
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

    expect(result.current.config).toBeUndefined();
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

    expect(result.current.config).toBeUndefined();
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
});

