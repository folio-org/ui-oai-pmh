import { useStripes } from '@folio/stripes/core';

import { useConfiguration } from './useConfiguration';
import { useUpdateConfiguration } from './useUpdateConfiguration';

/**
 * Custom hook that manages configuration operations
 * Combines fetching and updating configurations
 *
 * @param {string} configName - The name of the configuration to manage
 * @returns {Object} Object containing config, loading state, and handler functions
 */
export const useConfigurationManager = (configName) => {
  const stripes = useStripes();
  const { config, isConfigsLoading } = useConfiguration(configName);
  const { updateConfiguration } = useUpdateConfiguration(config?.id, configName);

  const handleSubmit = (configValue) => {
    const payload = {
      configName,
      configValue,
    };

    updateConfiguration(payload);
  };

  return {
    config,
    isConfigsLoading,
    handleSubmit,
    stripes,
  };
};

