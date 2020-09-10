import {
  MODULE_PATH,
} from './base';

export const SETS_ROUTE = 'sets';
export const SETS_CONFIG_NAME = 'sets';
export const SETS_PATH = `/${MODULE_PATH}/${SETS_ROUTE}`;

export const GENERAL_ACCORDION_NAME = 'general';
export const METADATA_ACCORDION_NAME = 'metadata';
export const FILTERING_CONDITIONS_ACCORDION_NAME = 'filteringConditions';

export const INITIAL_ACCORDION_STATE = {
  [GENERAL_ACCORDION_NAME]: true,
  [METADATA_ACCORDION_NAME]: false,
  [FILTERING_CONDITIONS_ACCORDION_NAME]: true,
};

export const SET_FIELDS_SET_SPEC_SEPARATOR = ':';

export const FILTERING_CONDITIONS_NAME = {
  LOCATION: 'location',
  RESOURCE_TYPE: 'resourceType',
  FORMAT: 'format',
  ILL_POLICY: 'illPolicy',
  MATERIAL_TYPE: 'materialType',
};

export const FILTERING_CONDITIONS_SET_SPEC_INITIAL_VALUES = {
  [FILTERING_CONDITIONS_NAME.LOCATION]: 'Loc',
  [FILTERING_CONDITIONS_NAME.RESOURCE_TYPE]: 'RT',
  [FILTERING_CONDITIONS_NAME.FORMAT]: 'Ft',
  [FILTERING_CONDITIONS_NAME.ILL_POLICY]: 'ILL',
  [FILTERING_CONDITIONS_NAME.MATERIAL_TYPE]: 'MT',
};

export const SET_FIELDS = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  SET_SPEC: 'setSpec',
  METADATA: 'metadata',
  CREATED_DATE: 'createdDate',
  CREATED_BY_USER_ID: 'createdByUserId',
  UPDATED_DATE: 'updatedDate',
  UPDATED_BY_USER_ID: 'updatedByUserId',
  FILTERING_CONDITIONS: 'filteringConditions',
};

export const SET_FIELDS_INITIAL_VALUES = {
  [SET_FIELDS.NAME]: '',
  [SET_FIELDS.DESCRIPTION]: '',
  [SET_FIELDS.SET_SPEC]: '',
  [SET_FIELDS.FILTERING_CONDITIONS]: [],
};

export const FILTERING_CONDITIONS_FIELDS = {
  NAME: 'name',
  ACTIVE: 'active',
  VALUE: 'value',
  SET_SPEC: 'setSpec',
};

export const FILTERING_CONDITIONS_FIELDS_INITIAL_VALUES = {
  [SET_FIELDS.NAME]: '',
  [SET_FIELDS.ACTIVE]: false,
  [SET_FIELDS.VALUE]: '',
  [SET_FIELDS.SET_SPEC]: '',
};

export const ERROR_TYPE_NOT_UNIQUE = 'notUnique';
export const ERROR_TYPE_EMPTY = 'empty';
