import {
  get,
} from 'lodash';

import {
  setSpecFromFilteringConditions,
} from './filteringConditionsDataOptions';

import {
  SET_FIELDS,
  SET_FIELDS_INITIAL_VALUES,
  FILTERING_CONDITIONS_FIELDS,
  FILTERING_CONDITIONS_FIELDS_INITIAL_VALUES,
} from '../constants';

export const getObjectFromResponseString = (data) => JSON.parse(get(data, [0, 'value'], '{}'));
export const dataObjectToString = (data) => JSON.stringify(data);
export const convertFromStringToBoolean = (value) => value === 'true';
export const convertFromBooleanToString = (value) => (value === true ? 'true' : 'false');

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const generalInformationToViewData = (set) => ({
  [SET_FIELDS.NAME]: set[SET_FIELDS.NAME],
  [SET_FIELDS.DESCRIPTION]: set[SET_FIELDS.DESCRIPTION] || SET_FIELDS_INITIAL_VALUES[SET_FIELDS.DESCRIPTION],
  [SET_FIELDS.SET_SPEC]: set[SET_FIELDS.SET_SPEC],
});

export const metaDataToViewData = (set) => ({
  [SET_FIELDS.METADATA]: {
    [SET_FIELDS.CREATED_DATE]: set[SET_FIELDS.CREATED_DATE],
    [SET_FIELDS.CREATED_BY_USER_ID]: set[SET_FIELDS.CREATED_BY_USER_ID],
    [SET_FIELDS.UPDATED_DATE]: set[SET_FIELDS.UPDATED_DATE],
    [SET_FIELDS.UPDATED_BY_USER_ID]: set[SET_FIELDS.UPDATED_BY_USER_ID],
  },
});

export const filteringConditionsToFormData = (filteringConditions = [], setsFilteringConditions = []) => ({
  [SET_FIELDS.FILTERING_CONDITIONS]: setsFilteringConditions.map((filteringCondition) => {
    const currentFilteringCondition = filteringConditions.find((condition) => condition[FILTERING_CONDITIONS_FIELDS.NAME] === filteringCondition[FILTERING_CONDITIONS_FIELDS.NAME]) || {};

    return {
      [FILTERING_CONDITIONS_FIELDS.NAME]: filteringCondition[FILTERING_CONDITIONS_FIELDS.NAME],
      [FILTERING_CONDITIONS_FIELDS.ACTIVE]: !!currentFilteringCondition[FILTERING_CONDITIONS_FIELDS.NAME],
      [FILTERING_CONDITIONS_FIELDS.VALUE]: currentFilteringCondition[FILTERING_CONDITIONS_FIELDS.VALUE]
        || FILTERING_CONDITIONS_FIELDS_INITIAL_VALUES[FILTERING_CONDITIONS_FIELDS.VALUE],
      [FILTERING_CONDITIONS_FIELDS.SET_SPEC]: currentFilteringCondition[FILTERING_CONDITIONS_FIELDS.SET_SPEC]
        || FILTERING_CONDITIONS_FIELDS_INITIAL_VALUES[FILTERING_CONDITIONS_FIELDS.SET_SPEC],
    };
  })
});

export const filteringConditionsToDtoFormat = (filteringConditions = []) => ({
  [SET_FIELDS.FILTERING_CONDITIONS]: filteringConditions
    .filter(
      (filteringCondition) => filteringCondition[FILTERING_CONDITIONS_FIELDS.ACTIVE]
        && filteringCondition[FILTERING_CONDITIONS_FIELDS.VALUE]
        && filteringCondition[FILTERING_CONDITIONS_FIELDS.SET_SPEC]
    )
    .map(filteringCondition => ({
      [FILTERING_CONDITIONS_FIELDS.NAME]: filteringCondition[FILTERING_CONDITIONS_FIELDS.NAME],
      [FILTERING_CONDITIONS_FIELDS.VALUE]: filteringCondition[FILTERING_CONDITIONS_FIELDS.VALUE],
      [FILTERING_CONDITIONS_FIELDS.SET_SPEC]: filteringCondition[FILTERING_CONDITIONS_FIELDS.SET_SPEC],
    }))
});

export const setInformationToViewData = (set) => ({
  ...generalInformationToViewData(set),
  ...filteringConditionsToDtoFormat(set[SET_FIELDS.FILTERING_CONDITIONS]),
  ...setSpecFromFilteringConditions(filteringConditionsToDtoFormat(set[SET_FIELDS.FILTERING_CONDITIONS])),
});
