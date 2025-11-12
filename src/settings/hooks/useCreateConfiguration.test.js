import { renderHook, act } from '@testing-library/react-hooks';
import { useMutation, useQueryClient } from 'react-query';
import { useOkapiKy, useNamespace } from '@folio/stripes/core';

import '../../../test/jest/__mock__';
import { useCreateConfiguration } from './useCreateConfiguration';
import { OAI_CONFIGURATIONS } from './constants';

jest.mock('react-query');
jest.mock('@folio/stripes/core', () => ({
  useOkapiKy: jest.fn(),
  useNamespace: jest.fn(),
}));

describe('useCreateConfiguration', () => {
  const mockKy = {
    post: jest.fn(),
  };

  const mockQueryClient = {
    invalidateQueries: jest.fn(),
  };

  const mockNamespaceKey = 'test-namespace';

  let mockMutate;

  beforeEach(() => {
    jest.clearAllMocks();

    useOkapiKy.mockReturnValue(mockKy);
    useQueryClient.mockReturnValue(mockQueryClient);
    useNamespace.mockReturnValue([mockNamespaceKey]);

    mockMutate = jest.fn();
    useMutation.mockReturnValue({
      mutate: mockMutate,
    });
  });

  it('should return createConfiguration function', () => {
    const { result } = renderHook(() => useCreateConfiguration());

    expect(result.current.createConfiguration).toBeDefined();
    expect(typeof result.current.createConfiguration).toBe('function');
  });

  it('should call useNamespace with OAI_CONFIGURATIONS key', () => {
    renderHook(() => useCreateConfiguration());

    expect(useNamespace).toHaveBeenCalledWith({ key: OAI_CONFIGURATIONS });
  });

  it('should call useOkapiKy', () => {
    renderHook(() => useCreateConfiguration());

    expect(useOkapiKy).toHaveBeenCalled();
  });

  it('should call useMutation with correct configuration', () => {
    renderHook(() => useCreateConfiguration());

    expect(useMutation).toHaveBeenCalled();
    const mutationConfig = useMutation.mock.calls[0][0];
    expect(mutationConfig.mutationFn).toBeDefined();
    expect(mutationConfig.onSuccess).toBeDefined();
  });

  it('should call ky.post with correct URL and data', async () => {
    const mockJsonResponse = { id: '1', configName: 'general' };
    mockKy.post.mockReturnValue({
      json: jest.fn().mockResolvedValue(mockJsonResponse),
    });

    renderHook(() => useCreateConfiguration());

    const mutationConfig = useMutation.mock.calls[0][0];
    const configData = { configName: 'general', configValue: { test: 'data' } };

    await act(async () => {
      await mutationConfig.mutationFn(configData);
    });

    expect(mockKy.post).toHaveBeenCalledWith('oai-pmh/configuration-settings', {
      json: configData,
    });
  });

  it('should invalidate queries on successful creation', async () => {
    const mockJsonResponse = { id: '1', configName: 'general' };
    mockKy.post.mockReturnValue({
      json: jest.fn().mockResolvedValue(mockJsonResponse),
    });

    renderHook(() => useCreateConfiguration());

    const mutationConfig = useMutation.mock.calls[0][0];
    const configData = { configName: 'general', configValue: { test: 'data' } };

    await act(async () => {
      await mutationConfig.mutationFn(configData);
      await mutationConfig.onSuccess();
    });

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [mockNamespaceKey],
    });
  });

  it('should call useQueryClient', () => {
    renderHook(() => useCreateConfiguration());

    expect(useQueryClient).toHaveBeenCalled();
  });

  it('should pass configuration data correctly', async () => {
    const mockJsonResponse = { id: '1' };
    mockKy.post.mockReturnValue({
      json: jest.fn().mockResolvedValue(mockJsonResponse),
    });

    renderHook(() => useCreateConfiguration());

    const mutationConfig = useMutation.mock.calls[0][0];
    const testData = {
      configName: 'technical',
      configValue: {
        maxRecordsPerResponse: 100,
        enableValidation: true,
      },
    };

    await act(async () => {
      await mutationConfig.mutationFn(testData);
    });

    expect(mockKy.post).toHaveBeenCalledWith('oai-pmh/configuration-settings', {
      json: testData,
    });
  });

  it('should handle API response correctly', async () => {
    const mockResponse = {
      id: '123',
      configName: 'general',
      configValue: { key: 'value' },
    };

    mockKy.post.mockReturnValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    renderHook(() => useCreateConfiguration());

    const mutationConfig = useMutation.mock.calls[0][0];
    const configData = { configName: 'general', configValue: { test: 'data' } };

    const result = await act(async () => {
      return mutationConfig.mutationFn(configData);
    });

    expect(result).toEqual(mockResponse);
  });

  it('should create multiple configurations sequentially', async () => {
    mockKy.post.mockReturnValue({
      json: jest.fn().mockResolvedValue({ id: '1' }),
    });

    renderHook(() => useCreateConfiguration());

    const mutationConfig = useMutation.mock.calls[0][0];

    const config1 = { configName: 'general', configValue: { test: '1' } };
    const config2 = { configName: 'technical', configValue: { test: '2' } };

    await act(async () => {
      await mutationConfig.mutationFn(config1);
      await mutationConfig.mutationFn(config2);
    });

    expect(mockKy.post).toHaveBeenCalledTimes(2);
    expect(mockKy.post).toHaveBeenNthCalledWith(1, 'oai-pmh/configuration-settings', {
      json: config1,
    });
    expect(mockKy.post).toHaveBeenNthCalledWith(2, 'oai-pmh/configuration-settings', {
      json: config2,
    });
  });
});

