import {
  forEach,
} from 'lodash';

import defaultValidators from './DefaultValidators';

export default class FormValidator {
  constructor(config, validators = defaultValidators) {
    this.config = config;
    this.validators = validators;
  }

  validate = (formData) => {
    let errors = {};

    forEach(Object.keys(this.config), (fieldName) => {
      const rules = this.config[fieldName].rules;

      rules.some((rule) => {
        const currentValidator = this.validators[rule];

        if (!currentValidator.validate(formData[fieldName])) {
          errors = {
            ...errors,
            [fieldName]: currentValidator.message,
          };

          return true;
        }

        return false;
      });
    });

    return errors;
  }
}
