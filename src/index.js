import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import Settings from './settings';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const OaiPmh = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Settings {...props} />
    </QueryClientProvider>
  );
};

export default OaiPmh;
