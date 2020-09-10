import React from 'react';
import {
  FormattedMessage,
} from 'react-intl';

import {
  FILTERING_CONDITIONS_FIELDS,
  EMPTY_VALIDATION_STATE_FOR_FIELD,
} from '../constants';

export const isFilteringConditionsFilled = (filteringConditions) => (
  filteringConditions.some((filteringCondition) => (
    filteringCondition[FILTERING_CONDITIONS_FIELDS.NAME] &&
    filteringCondition[FILTERING_CONDITIONS_FIELDS.ACTIVE] &&
    filteringCondition[FILTERING_CONDITIONS_FIELDS.SET_SPEC] &&
    filteringCondition[FILTERING_CONDITIONS_FIELDS.VALUE]
  ))
);

export const validateRequiredField = (value) => (
  value ? EMPTY_VALIDATION_STATE_FOR_FIELD : <FormattedMessage id="ui-oai-pmh.settings.sets.edit.validationMessage.required" />
);

export const validateFieldLength = (value = '', maxLength) => {
  const str = value.toString();

  if (value && str.length > maxLength) {
    return (
      <FormattedMessage
        id="ui-oai-pmh.settings.sets.edit.validationMessage.maxLength"
        values={{
          maxLength,
        }}
      />
    );
  }

  return EMPTY_VALIDATION_STATE_FOR_FIELD;
};

export const validateAllowedSymbols = (value) => {
  const rules = new RegExp('^[a-zA-Z0-9-_.!~*\'()]+$');

  return rules.test(value)
    ? EMPTY_VALIDATION_STATE_FOR_FIELD
    : <FormattedMessage id="ui-oai-pmh.settings.sets.edit.validationMessage.allowedSymbols" />;
};

export const composeValidators = (...validators) => (values) => (
  validators.reduce((error, validator) => error || validator(values), EMPTY_VALIDATION_STATE_FOR_FIELD)
);
