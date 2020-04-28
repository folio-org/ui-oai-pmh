import FormValidator from './FormValidator';

export default (formData) => {
  const config = {
    'maxRecordsPerResponse': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanZero'],
    },
  };

  const formValidator = new FormValidator(config);

  return formValidator.validate(formData);
};
