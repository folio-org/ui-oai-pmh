import {
  useContext,
  useCallback,
} from 'react';

import {
  CalloutContext,
} from '@folio/stripes/core';

const useCallout = () => {
  const callout = useContext(CalloutContext);

  return useCallback(
    ({ message, type = 'success' }) => {
      if (callout) {
        callout.sendCallout({
          type,
          message,
        });
      }
    },
    [callout],
  );
};

export default useCallout;
