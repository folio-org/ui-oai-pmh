import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  get,
} from 'lodash';

import {
  CALLOUT_ERROR_TYPE,
  ERROR_TYPE_NOT_UNIQUE,
} from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const connectionProblem = async (response, showCallout) => {
  const errors = await response.json();
  const errorType = get(errors, ['errors', 0, 'type'], '');

  if (errorType === ERROR_TYPE_NOT_UNIQUE) {
    showCallout({
      type: CALLOUT_ERROR_TYPE,
      message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.validationError.notUnique" />,
    });
  } else {
    showCallout({
      type: CALLOUT_ERROR_TYPE,
      message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.connectionProblem" />,
    });
  }
};
