import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const FilteringConditionsName = ({
  input: {
    value,
  }
}) => <FormattedMessage id={`ui-oai-pmh.settings.sets.filteringCondition.${value}`} />;

FilteringConditionsName.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default FilteringConditionsName;
