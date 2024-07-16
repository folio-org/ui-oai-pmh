import { useMutation } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';

export const useSetDelete = ({
  onSuccess,
  onError,
}) => {
  const ky = useOkapiKy();

  const { mutateAsync: deleteSet, isLoading } = useMutation({
    mutationFn: (id) => {
      return ky.delete(`oai-pmh/sets/${id}`);
    },
    onSuccess,
    onError,
  });

  return {
    deleteSet,
    isLoading,
  };
};
