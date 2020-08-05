import { get } from 'lodash';
import { SET_FIELDS, SET_FIELDS_INITIAL_VALUES } from '../constants';

export const getObjectFromResponseString = (data) => JSON.parse(get(data, [0, 'value'], '{}'));
export const dataObjectToString = (data) => JSON.stringify(data);
export const convertFromStringToBoolean = (value) => value === 'true';
export const convertFromBooleanToString = (value) => (value === true ? 'true' : 'false');

export const formatDuplicateDateToViewData = (set) => {
  return {
    [SET_FIELDS.NAME]: set[SET_FIELDS.NAME],
    [SET_FIELDS.DESCRIPTION]: set[SET_FIELDS.DESCRIPTION] || SET_FIELDS_INITIAL_VALUES[SET_FIELDS.DESCRIPTION],
    [SET_FIELDS.SET_SPEC]: set[SET_FIELDS.SET_SPEC],
    [SET_FIELDS.METADATA]: {
      [SET_FIELDS.CREATED_DATE]: set[SET_FIELDS.CREATED_DATE],
      [SET_FIELDS.CREATED_BY_USER_ID]: set[SET_FIELDS.CREATED_BY_USER_ID],
      [SET_FIELDS.UPDATED_DATE]: set[SET_FIELDS.UPDATED_DATE],
      [SET_FIELDS.UPDATED_BY_USER_ID]: set[SET_FIELDS.UPDATED_BY_USER_ID],
    },
  };
};

export const formatViewDataToDuplicateDate = (set) => {
  return {
    [SET_FIELDS.ID]: set[SET_FIELDS.ID],
    [SET_FIELDS.NAME]: set[SET_FIELDS.NAME],
    [SET_FIELDS.DESCRIPTION]: set[SET_FIELDS.DESCRIPTION] || SET_FIELDS_INITIAL_VALUES[SET_FIELDS.DESCRIPTION],
    [SET_FIELDS.SET_SPEC]: set[SET_FIELDS.SET_SPEC],
  };
};

export const formatEditDateToViewData = (set) => {
  return {
    [SET_FIELDS.ID]: set[SET_FIELDS.ID],
    ...formatDuplicateDateToViewData(set),
  };
};

export const formatViewDataToEditDate = (set) => {
  return {
    [SET_FIELDS.ID]: set[SET_FIELDS.ID],
    ...formatViewDataToDuplicateDate(set),
  };
};
