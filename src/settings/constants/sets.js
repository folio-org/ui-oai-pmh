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
  [SET_FIELDS.SET_SPEC]: 'DEFAULT_SET_SPEC', // TODO:: Temporary solution for integration with BE. Change from 'DEFAULT_SET_SPEC' to '' after SET_SPEC implantation.
};

export const FILTERING_CONDITIONS_FIELDS = {
  ID: 'id',
  NAME: 'name',
  ACTIVE: 'active',
  VALUE: 'value',
  SET_SPEC: 'setSpec',
};
