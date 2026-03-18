import {
  FormValidator,
} from '../../common';

export default (formData) => {
  if (!formData.enableOaiService) {
    return {};
  }

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
