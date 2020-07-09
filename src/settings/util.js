import { get } from 'lodash';

import {
  SETS_PATH,
} from './constants';

export const getObjectFromResponseString = (data) => JSON.parse(get(data, [0, 'value'], '{}'));
export const dataObjectToString = (data) => JSON.stringify(data);
export const convertFromStringToBoolean = (value) => value === 'true';
export const convertFromBooleanToString = (value) => (value === true ? 'true' : 'false');

export const getSetsListUrl = () => `${SETS_PATH}`;
export const getSetsViewUrl = (id) => `${SETS_PATH}/${id}/view`;
export const getSetsCreateUrl = () => `${SETS_PATH}/create`;
export const getSetsEditUrl = (id) => `${SETS_PATH}/${id}/edit`;
