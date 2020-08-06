import {
  SETS_PATH,
} from '../constants';

export const getSetsListUrl = () => `${SETS_PATH}`;
export const getSetsViewUrl = (id) => `${SETS_PATH}/${id}/view`;
export const getSetsCreateUrl = () => `${SETS_PATH}/create`;
export const getSetsEditUrl = (id) => `${SETS_PATH}/${id}/edit`;
export const getSetsDuplicateUrl = (id) => `${SETS_PATH}/${id}/duplicate`;
