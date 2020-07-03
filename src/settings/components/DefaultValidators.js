import { FormattedMessage } from 'react-intl';
import {
  isEmpty,
  toNumber,
  isNumber,
  isInteger,
} from 'lodash';
import React from 'react';

export default {
  isNotEmpty: {
    validate: (value) => (isNumber(value) || !isEmpty(value)),
    message: <FormattedMessage id="ui-oai-pmh.settings.all.validationMessage.isNotEmpty" />,
  },
  isIntegerGreaterThanZero: {
    validate: (value) => {
      const number = toNumber(value);

      return isInteger(number) && number > 0;
    },
    message: <FormattedMessage id="ui-oai-pmh.settings.all.validationMessage.isIntegerGreaterThanZero" />,
  },
  less500: {
    validate: (value) => value <= 500,
    message: <FormattedMessage id="ui-oai-pmh.settings.all.validationMessage.less500" />,
  },
  isUrl: {
    validate: (value) => {
      // regexp taken from the module ui-organizations
      const REGEXP_URL = new RegExp('^$|([Hh][Tt][Tt][Pp]|[Ff][Tt][Pp])([Ss])?://.+$');

      return REGEXP_URL.test(value);
    },
    message: <FormattedMessage id="ui-oai-pmh.settings.all.validationMessage.isUrl" />,
  },
  isEmail: {
    validate: (value) => {
      // regexp taken from the module ui-finc-select
      const REGEXP_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const EMAIL_SEPARATOR = ',';
      const emails = value.split(EMAIL_SEPARATOR);

      return emails.every(email => REGEXP_EMAIL.test(email.trim()));
    },
    message: <FormattedMessage id="ui-oai-pmh.settings.all.validationMessage.isEmail" />,
  },
};
