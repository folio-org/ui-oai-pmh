import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Tooltip,
} from '@folio/stripes/components';

import {
  FILTERING_CONDITIONS_FIELDS,
} from '../../../../../../constants';

import css from './MissingValue.css';

const MissingValue = ({
  filteringCondition,
}) => {
  return (
    <Tooltip
      id={`tooltip-${filteringCondition[FILTERING_CONDITIONS_FIELDS.NAME]}`}
      text={<FormattedMessage id="ui-oai-pmh.settings.sets.view.filteringConditions.field.value.isMissing" />}
    >
      {({ ref, ariaIds }) => (
        <div
          ref={ref}
          aria-labelledby={ariaIds.text}
          className={css.missingValue}
        >
          {filteringCondition[FILTERING_CONDITIONS_FIELDS.VALUE]}
        </div>
      )}
    </Tooltip>
  );
};

MissingValue.propTypes = {
  filteringCondition: PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setSpec: PropTypes.string.isRequired,
  }).isRequired,
};

export default MissingValue;
