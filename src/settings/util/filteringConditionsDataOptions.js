import {
  SET_FIELDS_SET_SPEC_SEPARATOR,
  FILTERING_CONDITIONS_FIELDS,
  SET_FIELDS,
} from '../constants';

export const filteringConditionsDataOptions = (filteringConditions, intl) => {
  const FILTERING_CONDITIONS_EMPTY_VALUE = '';
  const dataOptions = {};

  filteringConditions.forEach((filteringCondition) => {
    dataOptions[filteringCondition[FILTERING_CONDITIONS_FIELDS.NAME]] = [
      {
        label: intl.formatMessage({
          id: `ui-oai-pmh.settings.sets.edit.filteringConditions.field.value.select.${filteringCondition[FILTERING_CONDITIONS_FIELDS.NAME]}`
        }),
        value: FILTERING_CONDITIONS_EMPTY_VALUE,
      },
      ...filteringCondition.values
        .map(filterValue => ({
          label: filterValue,
          value: filterValue,
        })),
    ];
  });

  return dataOptions;
};

export const setSpecValueFromFilteringConditions = (filteringConditions) => (
  filteringConditions
    .filter(({ setSpec }) => setSpec)
    .map(({ setSpec }) => setSpec)
    .join(SET_FIELDS_SET_SPEC_SEPARATOR));

export const setSpecFromFilteringConditions = (filteringConditions) => ({
  [SET_FIELDS.SET_SPEC]: setSpecValueFromFilteringConditions(filteringConditions[SET_FIELDS.FILTERING_CONDITIONS]),
});
