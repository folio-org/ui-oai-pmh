import React from 'react';
import PropTypes from 'prop-types';

import {
  setSpecValueFromFilteringConditions,
} from '../../../../../../../util';

import {
  SET_FIELDS,
  SET_FIELDS_INITIAL_VALUES,
} from '../../../../../../../constants';

import css from './SetSpecification.css';

const generateSetSpecification = (value) => (
  value?.length
    ? setSpecValueFromFilteringConditions(value)
    : SET_FIELDS_INITIAL_VALUES[SET_FIELDS.SET_SPEC]
);

const SetSpecification = ({
  label,
  input: {
    value,
  },
}) => {
  return (
    <>
      <div
        data-test-set-fields-set-specification-label
        className={css.title}
      >
        {label}
      </div>
      <div
        data-test-set-fields-set-specification-text
        className={css.content}
      >
        {generateSetSpecification(value)}
      </div>
    </>
  );
};

SetSpecification.defaultProps = {
  input: {
    values: [],
  },
};

SetSpecification.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.array,
  }),
};

export default SetSpecification;
