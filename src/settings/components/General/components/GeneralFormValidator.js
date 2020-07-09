import {
  FormValidator,
} from '../../common';

export default (formData) => {
  const config = {
    'repositoryName': {
      rules: ['isNotEmpty'],
    },
    'baseUrl': {
      rules: ['isNotEmpty', 'isUrl'],
    },
    'administratorEmail': {
      rules: ['isNotEmpty', 'isEmail'],
    },
  };

  const formValidator = new FormValidator(config);

  return formValidator.validate(formData);
};
