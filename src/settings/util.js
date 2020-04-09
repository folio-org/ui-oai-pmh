import { get } from 'lodash';

export const getObjectFromResponseString = (data) => JSON.parse(get(data, [0, 'value'], '{}'));

export const dataObjectToString = (data) => JSON.stringify(data);

export const convertFromStringToBoolean = (value) => value === 'true';

export const convertFromBooleanToString = (value) => (value === true ? 'true' : 'false');
