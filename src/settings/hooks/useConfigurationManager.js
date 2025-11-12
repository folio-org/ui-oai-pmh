import { useStripes } from '@folio/stripes/core';

import { useConfiguration } from './useConfiguration';
import { useCreateConfiguration } from './useCreateConfiguration';
import { useUpdateConfiguration } from './useUpdateConfiguration';

/**
 * Custom hook that manages configuration CRUD operations
 * Combines fetching, creating, and updating configurations
 *
 * @param {string} configName - The name of the configuration to manage
 * @returns {Object} Object containing config, loading state, and handler functions
 */
export const useConfigurationManager = (configName) => {
  const stripes = useStripes();
  const { config, isConfigsLoading } = useConfiguration(configName);
  const { createConfiguration } = useCreateConfiguration();
  const { updateConfiguration } = useUpdateConfiguration(config?.id, configName);

  const handleSubmit = (configValue) => {
    const payload = {
      configName,
      configValue,
    };

    if (config?.id) {
      updateConfiguration(payload);
    } else {
      createConfiguration(payload);
    }
  };

  return {
    config,
    isConfigsLoading,
    handleSubmit,
    stripes,
  };
};

