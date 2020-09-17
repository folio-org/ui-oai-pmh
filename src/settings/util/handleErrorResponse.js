import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  get,
} from 'lodash';

import {
  CALLOUT_ERROR_TYPE,
  ERROR_TYPE_NOT_UNIQUE,
  ERROR_TYPE_EMPTY,
  SET_FIELDS,
  UNPROCESSABLE_ENTITY_STATUS_CODE,
} from '../constants';

const UNSUPPORTED_ERROR_TRANSLATION_KEY = 'ui-oai-pmh.settings.sets.callout.connectionProblem';

const ERRORS_FOR_SUPPORTED_ERROR_TYPES_AND_FIELDS = {
  [ERROR_TYPE_NOT_UNIQUE]: {
    [SET_FIELDS.NAME]: 'ui-oai-pmh.settings.sets.callout.validationError.notUnique',
    [SET_FIELDS.SET_SPEC]: 'ui-oai-pmh.settings.sets.callout.validationError.notUnique',
  },
  [ERROR_TYPE_EMPTY]: {
    [SET_FIELDS.NAME]: 'ui-oai-pmh.settings.sets.callout.validationError.empty.name',
    [SET_FIELDS.SET_SPEC]: 'ui-oai-pmh.settings.sets.callout.validationError.empty.setSpec',
  },
};

const getTranslationKeyForError = (type, field) => (
  ERRORS_FOR_SUPPORTED_ERROR_TYPES_AND_FIELDS[type][field] || UNSUPPORTED_ERROR_TRANSLATION_KEY
);

// eslint-disable-next-line import/prefer-default-export
export const handleErrorResponse = async (response, showCallout) => {
  if (response.status === UNPROCESSABLE_ENTITY_STATUS_CODE) {
    const errorsResponse = await response.json();
    const errors = get(errorsResponse, ['errors'], []);

    errors.forEach((error) => {
      const type = get(error, ['type'], '');
      const field = get(error, ['parameters', 0, 'key'], '');

      showCallout({
        type: CALLOUT_ERROR_TYPE,
        message: <FormattedMessage id={getTranslationKeyForError(type, field)} />,
      });
    });
  } else {
    showCallout({
      type: CALLOUT_ERROR_TYPE,
      message: <FormattedMessage id={UNSUPPORTED_ERROR_TRANSLATION_KEY} />,
    });
  }
};
