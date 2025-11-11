import { renderHook, act } from '@testing-library/react-hooks';

import '../../../test/jest/__mock__';
import { useConfiguration } from './useConfiguration';
import { useCreateConfiguration } from './useCreateConfiguration';
import { useUpdateConfiguration } from './useUpdateConfiguration';
import { useConfigurationManager } from './useConfigurationManager';

jest.mock('./useConfiguration', () => ({
  useConfiguration: jest.fn(),
}));

jest.mock('./useCreateConfiguration', () => ({
  useCreateConfiguration: jest.fn(),
}));

jest.mock('./useUpdateConfiguration', () => ({
  useUpdateConfiguration: jest.fn(),
}));

const mockConfig = {
  id: '1',
  configValue: { test: 'value' },
};

describe('useConfigurationManager Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return hook functions and state', () => {
    useConfiguration.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
    });

    useCreateConfiguration.mockReturnValue({
      createConfiguration: jest.fn(),
    });

    useUpdateConfiguration.mockReturnValue({
      updateConfiguration: jest.fn(),
    });

    const { result } = renderHook(() => useConfigurationManager('test-config'));

    expect(result.current).toHaveProperty('config');
    expect(result.current).toHaveProperty('isConfigsLoading');
    expect(result.current).toHaveProperty('handleSubmit');
    expect(result.current).toHaveProperty('stripes');
  });

  it('should return correct config value', () => {
    useConfiguration.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
    });

    useCreateConfiguration.mockReturnValue({
      createConfiguration: jest.fn(),
    });

    useUpdateConfiguration.mockReturnValue({
      updateConfiguration: jest.fn(),
    });

    const { result } = renderHook(() => useConfigurationManager('test-config'));

    expect(result.current.config).toEqual(mockConfig);
  });

  it('should return correct loading state', () => {
    useConfiguration.mockReturnValue({
      config: null,
      isConfigsLoading: true,
    });

    useCreateConfiguration.mockReturnValue({
      createConfiguration: jest.fn(),
    });

    useUpdateConfiguration.mockReturnValue({
      updateConfiguration: jest.fn(),
    });

    const { result } = renderHook(() => useConfigurationManager('test-config'));

    expect(result.current.isConfigsLoading).toBe(true);
  });

  it('should call handleSubmit with update when config has id', () => {
    const mockUpdateConfiguration = jest.fn();

    useConfiguration.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
    });

    useCreateConfiguration.mockReturnValue({
      createConfiguration: jest.fn(),
    });

    useUpdateConfiguration.mockReturnValue({
      updateConfiguration: mockUpdateConfiguration,
    });

    const { result } = renderHook(() => useConfigurationManager('test-config'));

    const testData = { field: 'value' };
    act(() => {
      result.current.handleSubmit(testData);
    });

    expect(mockUpdateConfiguration).toHaveBeenCalledWith({
      configName: 'test-config',
      configValue: testData,
    });
  });

  it('should call handleSubmit with create when config is null', () => {
    const mockCreateConfiguration = jest.fn();

    useConfiguration.mockReturnValue({
      config: null,
      isConfigsLoading: false,
    });

    useCreateConfiguration.mockReturnValue({
      createConfiguration: mockCreateConfiguration,
    });

    useUpdateConfiguration.mockReturnValue({
      updateConfiguration: jest.fn(),
    });

    const { result } = renderHook(() => useConfigurationManager('test-config'));

    const testData = { field: 'value' };
    act(() => {
      result.current.handleSubmit(testData);
    });

    expect(mockCreateConfiguration).toHaveBeenCalledWith({
      configName: 'test-config',
      configValue: testData,
    });
  });

  it('should pass correct config name to useConfiguration', () => {
    useConfiguration.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
    });

    useCreateConfiguration.mockReturnValue({
      createConfiguration: jest.fn(),
    });

    useUpdateConfiguration.mockReturnValue({
      updateConfiguration: jest.fn(),
    });

    renderHook(() => useConfigurationManager('general'));

    expect(useConfiguration).toHaveBeenCalledWith('general');
  });

  it('should pass config id to useUpdateConfiguration', () => {
    useConfiguration.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
    });

    useCreateConfiguration.mockReturnValue({
      createConfiguration: jest.fn(),
    });

    useUpdateConfiguration.mockReturnValue({
      updateConfiguration: jest.fn(),
    });

    renderHook(() => useConfigurationManager('test-config'));

    expect(useUpdateConfiguration).toHaveBeenCalledWith('1', 'test-config');
  });

  it('should return stripes object from useStripes', () => {
    useConfiguration.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
    });

    useCreateConfiguration.mockReturnValue({
      createConfiguration: jest.fn(),
    });

    useUpdateConfiguration.mockReturnValue({
      updateConfiguration: jest.fn(),
    });

    const { result } = renderHook(() => useConfigurationManager('test-config'));

    expect(result.current.stripes).toBeDefined();
    expect(result.current.stripes.hasPerm).toBeDefined();
  });

  it('should handle multiple config names', () => {
    useConfiguration.mockReturnValue({
      config: mockConfig,
      isConfigsLoading: false,
    });

    useCreateConfiguration.mockReturnValue({
      createConfiguration: jest.fn(),
    });

    useUpdateConfiguration.mockReturnValue({
      updateConfiguration: jest.fn(),
    });

    const { rerender } = renderHook(
      ({ configName }) => useConfigurationManager(configName),
      { initialProps: { configName: 'general' } }
    );

    expect(useConfiguration).toHaveBeenCalledWith('general');

    rerender({ configName: 'technical' });

    expect(useConfiguration).toHaveBeenCalledWith('technical');
  });
});

