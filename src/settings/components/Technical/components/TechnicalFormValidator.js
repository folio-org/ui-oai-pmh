import {
  FormValidator,
} from '../../common';

export default (formData) => {
  const config = {
    'maxRecordsPerResponse': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanZero', 'less500'],
    },
  };

  const formValidator = new FormValidator(config);

  return formValidator.validate(formData);
};
