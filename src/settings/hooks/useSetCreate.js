import { useMutation } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';

export const useSetCreate = ({
  onSuccess,
  onError,
}) => {
  const ky = useOkapiKy();

  const { mutateAsync: createSet, isLoading } = useMutation({
    mutationFn: (variables) => {
      return ky.post('oai-pmh/sets', {
        json: variables,
      }).json();
    },
    onSuccess,
    onError,
  });

  return {
    createSet,
    isLoading,
  };
};
