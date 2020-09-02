import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  get,
} from 'lodash';

import {
  Accordion,
  MultiColumnList,
} from '@folio/stripes/components';

import {
  FILTERING_CONDITIONS_ACCORDION_NAME,
  FILTERING_CONDITIONS_FIELDS,
} from '../../../../../constants';

import MissingValue from './components';

import css from './FilteringConditions.css';

const getContentData = (filteringConditions = [], setsFilteringConditions = []) => (
  filteringConditions.length && setsFilteringConditions.length ? filteringConditions : []
);

const columnMapping = {
  [FILTERING_CONDITIONS_FIELDS.NAME]: <FormattedMessage id={`ui-oai-pmh.settings.sets.view.filteringConditions.field.${FILTERING_CONDITIONS_FIELDS.NAME}`} />,
  [FILTERING_CONDITIONS_FIELDS.VALUE]: <FormattedMessage id={`ui-oai-pmh.settings.sets.view.filteringConditions.field.${FILTERING_CONDITIONS_FIELDS.VALUE}`} />,
  [FILTERING_CONDITIONS_FIELDS.SET_SPEC]: <FormattedMessage id={`ui-oai-pmh.settings.sets.view.filteringConditions.field.${FILTERING_CONDITIONS_FIELDS.SET_SPEC}`} />,
};

const visibleColumns = [
  FILTERING_CONDITIONS_FIELDS.NAME,
  FILTERING_CONDITIONS_FIELDS.VALUE,
  FILTERING_CONDITIONS_FIELDS.SET_SPEC,
];

const isValueExistInInFilteringConditions = (setsFilteringConditions, setFilteringCondition) => {
  const currentFilteringCondition = setsFilteringConditions
    .find(
      (filteringCondition) => filteringCondition[FILTERING_CONDITIONS_FIELDS.NAME] === setFilteringCondition[FILTERING_CONDITIONS_FIELDS.NAME]
    );

  return get(currentFilteringCondition, ['values'], []).includes(setFilteringCondition[FILTERING_CONDITIONS_FIELDS.VALUE]);
};

const resultsFormatter = (setsFilteringConditions) => ({
  [FILTERING_CONDITIONS_FIELDS.NAME]: (data) => (
    <span className={css.filteringConditionFieldsTitle}>
      <FormattedMessage id={`ui-oai-pmh.settings.sets.filteringCondition.${data[FILTERING_CONDITIONS_FIELDS.NAME]}`} />
    </span>
  ),
  [FILTERING_CONDITIONS_FIELDS.VALUE]: (data) => (
    isValueExistInInFilteringConditions(setsFilteringConditions, data)
      ? data[FILTERING_CONDITIONS_FIELDS.VALUE]
      : <MissingValue filteringCondition={data} />
  ),
});

const columnWidths = {
  [FILTERING_CONDITIONS_FIELDS.NAME]: '20%',
  [FILTERING_CONDITIONS_FIELDS.VALUE]: '40%',
  [FILTERING_CONDITIONS_FIELDS.SET_SPEC]: '40%',
};

const FilteringConditions = ({
  filteringConditions,
  setsFilteringConditions,
}) => {
  return (
    <Accordion
      id={FILTERING_CONDITIONS_ACCORDION_NAME}
      label={<FormattedMessage id="ui-oai-pmh.settings.sets.view.accordion.filteringConditions.title" />}
    >
      <MultiColumnList
        id="viewFilteringConditions"
        fullWidth
        contentData={getContentData(filteringConditions, setsFilteringConditions)}
        columnMapping={columnMapping}
        visibleColumns={visibleColumns}
        formatter={resultsFormatter(setsFilteringConditions)}
        columnWidths={columnWidths}
      />
    </Accordion>
  );
};

FilteringConditions.propTypes = {
  filteringConditions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setSpec: PropTypes.string.isRequired,
  })),
  setsFilteringConditions: PropTypes.arrayOf(PropTypes.object),
};

export default FilteringConditions;
