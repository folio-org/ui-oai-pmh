import { renderHook, act } from '@testing-library/react-hooks';
import { useMutation, useQueryClient } from 'react-query';
import { useOkapiKy, useNamespace } from '@folio/stripes/core';
import { useIntl } from 'react-intl';
import { useShowCallout } from '@folio/stripes-acq-components';

import '../../../test/jest/__mock__';
import { useUpdateConfiguration } from './useUpdateConfiguration';
import { OAI_CONFIGURATION } from './useConfiguration';

jest.mock('react-query');
jest.mock('@folio/stripes/core', () => ({
  useOkapiKy: jest.fn(),
  useNamespace: jest.fn(),
}));
jest.mock('react-intl', () => ({
  useIntl: jest.fn(),
}));
jest.mock('@folio/stripes-acq-components', () => ({
  useShowCallout: jest.fn(),
}));

describe('useUpdateConfiguration', () => {
  const mockKy = {
    put: jest.fn(),
  };

  const mockQueryClient = {
    invalidateQueries: jest.fn(),
  };

  const mockShowCallout = jest.fn();
  const mockFormatMessage = jest.fn((msg) => msg.id);
  const mockNamespaceKey = 'test-namespace';
  const mockConfigId = '1';
  const mockConfigName = 'technical';

  let mockMutate;

  beforeEach(() => {
    jest.clearAllMocks();

    useOkapiKy.mockReturnValue(mockKy);
    useQueryClient.mockReturnValue(mockQueryClient);
    useShowCallout.mockReturnValue(mockShowCallout);
    useNamespace.mockReturnValue([mockNamespaceKey]);
    useIntl.mockReturnValue({ formatMessage: mockFormatMessage });

    mockMutate = jest.fn();
    useMutation.mockReturnValue({
      mutate: mockMutate,
    });
  });

  it('should return updateConfiguration function', () => {
    const { result } = renderHook(() => useUpdateConfiguration(mockConfigId, mockConfigName));

    expect(result.current.updateConfiguration).toBeDefined();
    expect(typeof result.current.updateConfiguration).toBe('function');
  });

  it('should call useNamespace with OAI_CONFIGURATION key', () => {
    renderHook(() => useUpdateConfiguration(mockConfigId, mockConfigName));

    expect(useNamespace).toHaveBeenCalledWith({ key: OAI_CONFIGURATION });
  });

  it('should call useOkapiKy', () => {
    renderHook(() => useUpdateConfiguration(mockConfigId, mockConfigName));

    expect(useOkapiKy).toHaveBeenCalled();
  });

  it('should call useShowCallout', () => {
    renderHook(() => useUpdateConfiguration(mockConfigId, mockConfigName));

    expect(useShowCallout).toHaveBeenCalled();
  });

  it('should call useMutation with correct configuration', () => {
    renderHook(() => useUpdateConfiguration(mockConfigId, mockConfigName));

    expect(useMutation).toHaveBeenCalled();
    const mutationConfig = useMutation.mock.calls[0][0];
    expect(mutationConfig.mutationFn).toBeDefined();
    expect(mutationConfig.onSuccess).toBeDefined();
  });

  it('should call ky.put with correct URL and data', async () => {
    const mockJsonResponse = { id: mockConfigId, configName: mockConfigName };
    mockKy.put.mockReturnValue({
      json: jest.fn().mockResolvedValue(mockJsonResponse),
    });

    renderHook(() => useUpdateConfiguration(mockConfigId, mockConfigName));

    const mutationConfig = useMutation.mock.calls[0][0];
    const configData = { configName: mockConfigName, configValue: { test: 'data' } };

    await act(async () => {
      await mutationConfig.mutationFn(configData);
    });

    expect(mockKy.put).toHaveBeenCalledWith(`oai-pmh/configuration-settings/${mockConfigId}`, {
      json: configData,
    });
  });

  it('should show success callout on successful update', async () => {
    const mockJsonResponse = { id: mockConfigId };
    mockKy.put.mockReturnValue({
      json: jest.fn().mockResolvedValue(mockJsonResponse),
    });

    renderHook(() => useUpdateConfiguration(mockConfigId, mockConfigName));

    const mutationConfig = useMutation.mock.calls[0][0];
    const configData = { configName: mockConfigName, configValue: { test: 'data' } };

    await act(async () => {
      await mutationConfig.mutationFn(configData);
      await mutationConfig.onSuccess();
    });

    expect(mockShowCallout).toHaveBeenCalledWith({
      message: 'ui-oai-pmh.settings.configuration.update.success',
      type: 'success',
    });
  });

  it('should invalidate queries on successful update', async () => {
    const mockJsonResponse = { id: mockConfigId };
    mockKy.put.mockReturnValue({
      json: jest.fn().mockResolvedValue(mockJsonResponse),
    });

    renderHook(() => useUpdateConfiguration(mockConfigId, mockConfigName));

    const mutationConfig = useMutation.mock.calls[0][0];
    const configData = { configName: mockConfigName, configValue: { test: 'data' } };

    await act(async () => {
      await mutationConfig.mutationFn(configData);
      await mutationConfig.onSuccess();
    });

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [mockNamespaceKey, mockConfigName],
    });
  });

  it('should format success message correctly', async () => {
    const mockJsonResponse = { id: mockConfigId };
    mockKy.put.mockReturnValue({
      json: jest.fn().mockResolvedValue(mockJsonResponse),
    });

    renderHook(() => useUpdateConfiguration(mockConfigId, mockConfigName));

    const mutationConfig = useMutation.mock.calls[0][0];
    const configData = { configName: mockConfigName, configValue: { test: 'data' } };

    await act(async () => {
      await mutationConfig.mutationFn(configData);
      await mutationConfig.onSuccess();
    });

    expect(mockFormatMessage).toHaveBeenCalledWith({ id: 'ui-oai-pmh.settings.configuration.update.success' });
  });

  it('should call useIntl', () => {
    renderHook(() => useUpdateConfiguration(mockConfigId, mockConfigName));

    expect(useIntl).toHaveBeenCalled();
  });

  it('should call useQueryClient', () => {
    renderHook(() => useUpdateConfiguration(mockConfigId, mockConfigName));

    expect(useQueryClient).toHaveBeenCalled();
  });
});

