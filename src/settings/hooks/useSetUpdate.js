import { useMutation } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';

export const useSetUpdate = ({
  id,
  onSuccess,
  onError,
}) => {
  const ky = useOkapiKy();

  const { mutateAsync: updateSet, isLoading } = useMutation({
    mutationFn: (variables) => {
      return ky.put(`oai-pmh/sets/${id}`, {
        json: variables,
      }).json();
    },
    onSuccess,
    onError,
  });

  return {
    updateSet,
    isLoading,
  };
};
