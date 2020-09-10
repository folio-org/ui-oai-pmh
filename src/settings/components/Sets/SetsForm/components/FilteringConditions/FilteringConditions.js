import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Col,
  Row,
  Accordion,
  Checkbox,
  TextField,
  Select,
} from '@folio/stripes/components';

import {
  EMPTY_VALIDATION_STATE_FOR_FIELD,
  FILTERING_CONDITIONS_ACCORDION_NAME,
  SET_FIELDS,
  FILTERING_CONDITIONS_FIELDS,
  FILTERING_CONDITIONS_FIELDS_INITIAL_VALUES,
  FILTERING_CONDITIONS_SET_SPEC_INITIAL_VALUES,
  SHORT_TEXT_FIELD_MAX_FIELD_LENGTH,
} from '../../../../../constants';

import {
  FilteringConditionsName,
  FilteringConditionsTitle,
} from './components';

import {
  capitalizeFirstLetter,
  composeValidators,
  validateRequiredField,
  validateFieldLength,
  validateAllowedSymbols,
} from '../../../../../util';

import css from './FilteringConditions.css';

const getSetSpec = (filteringConditionsName, filteringConditionsValue) => {
  const FILTERING_CONDITIONS_WORD_SEPARATOR = ' ';
  const EMPTY_STRING = '';
  const setSpecFirstPart = FILTERING_CONDITIONS_SET_SPEC_INITIAL_VALUES[filteringConditionsName];
  let setSpecSecondPart = EMPTY_STRING;
  const filteringConditions = filteringConditionsValue.split(FILTERING_CONDITIONS_WORD_SEPARATOR);

  if (!filteringConditionsValue) {
    return EMPTY_STRING;
  }

  if (filteringConditions.length === 1) {
    setSpecSecondPart = capitalizeFirstLetter(filteringConditionsValue.slice(0, 3).toLowerCase());
  } else {
    setSpecSecondPart = filteringConditions.map((word) => (word.slice(0, 1).toUpperCase())).join('');
  }

  return `${setSpecFirstPart}_${setSpecSecondPart}`;
};

const validateSetSpecLength = (value) => validateFieldLength(value, SHORT_TEXT_FIELD_MAX_FIELD_LENGTH);

const validateValue = (index, fields) => {
  const active = fields.value[index][FILTERING_CONDITIONS_FIELDS.ACTIVE];
  const value = fields.value[index][FILTERING_CONDITIONS_FIELDS.VALUE];

  if (active) {
    return validateRequiredField(value);
  }

  return EMPTY_VALIDATION_STATE_FOR_FIELD;
};

const validateSetSpec = (index, fields) => {
  const active = fields.value[index][FILTERING_CONDITIONS_FIELDS.ACTIVE];
  const value = fields.value[index][FILTERING_CONDITIONS_FIELDS.VALUE];
  const setSpec = fields.value[index][FILTERING_CONDITIONS_FIELDS.SET_SPEC];

  if (active && value) {
    return composeValidators(
      validateRequiredField,
      validateSetSpecLength,
      validateAllowedSymbols,
    )(setSpec);
  }

  return EMPTY_VALIDATION_STATE_FOR_FIELD;
};

const FilteringConditions = ({
  filteringConditionsDataOptions,
}) => {
  return (
    <Accordion
      id={FILTERING_CONDITIONS_ACCORDION_NAME}
      label={<FormattedMessage id="ui-oai-pmh.settings.sets.edit.accordion.filteringConditions.title" />}
    >
      <FilteringConditionsTitle />
      <FieldArray name={SET_FIELDS.FILTERING_CONDITIONS}>
        {({ fields }) => fields.map((filteringCondition, index) => (
          <Row
            data-test-set-filtering-conditions-row
            key={index}
            className={css.SetRow}
          >
            <Col
              data-test-set-filtering-conditions-row-name
              sm={3}
              className={css.SetCell}
            >
              <Field
                required
                id={`${FILTERING_CONDITIONS_FIELDS.NAME}${index}`}
                name={`${filteringCondition}.${FILTERING_CONDITIONS_FIELDS.NAME}`}
                type="text"
                component={FilteringConditionsName}
              />
            </Col>
            <Col
              data-test-set-filtering-conditions-row-active
              sm={1}
              className={css.SetCell}
            >
              <FormattedMessage id="ui-oai-pmh.settings.sets.view.filteringConditions.field.name.ariaLabel">
                {(ariaLabel) => (
                  <Field
                    id={`${FILTERING_CONDITIONS_FIELDS.ACTIVE}${index}`}
                    name={`${filteringCondition}.${FILTERING_CONDITIONS_FIELDS.ACTIVE}`}
                    aria-label={ariaLabel}
                    type="checkbox"
                    className={css.Checkbox}
                    label=" "
                    component={Checkbox}
                    onClick={() => {
                      if (fields.value[index][FILTERING_CONDITIONS_FIELDS.ACTIVE]) {
                        fields.update(index, {
                          ...fields.value[index],
                          [FILTERING_CONDITIONS_FIELDS.VALUE]: FILTERING_CONDITIONS_FIELDS_INITIAL_VALUES[SET_FIELDS.VALUE],
                          [FILTERING_CONDITIONS_FIELDS.SET_SPEC]: FILTERING_CONDITIONS_FIELDS_INITIAL_VALUES[SET_FIELDS.SET_SPEC],
                        });
                      }
                    }}
                  />
                )}
              </FormattedMessage>
            </Col>
            <Col
              data-test-set-filtering-conditions-row-value
              sm={4}
              className={css.SetCell}
            >
              <FormattedMessage id="ui-oai-pmh.settings.sets.view.filteringConditions.field.value.ariaLabel">
                {(ariaLabel) => (
                  <Field
                    id={`${FILTERING_CONDITIONS_FIELDS.VALUE}${index}`}
                    name={`${filteringCondition}.${FILTERING_CONDITIONS_FIELDS.VALUE}`}
                    aria-label={ariaLabel}
                    validate={() => validateValue(index, fields)}
                    onChange={(event) => {
                      fields.update(index, {
                        ...fields.value[index],
                        [FILTERING_CONDITIONS_FIELDS.VALUE]: event.target.value,
                        [FILTERING_CONDITIONS_FIELDS.SET_SPEC]: getSetSpec(fields.value[index][FILTERING_CONDITIONS_FIELDS.NAME], event.target.value),
                      });
                    }}
                    component={Select}
                    dataOptions={filteringConditionsDataOptions[fields.value[index][FILTERING_CONDITIONS_FIELDS.NAME]]}
                    disabled={!fields.value[index][FILTERING_CONDITIONS_FIELDS.ACTIVE]}
                  />
                )}
              </FormattedMessage>
            </Col>
            <Col
              data-test-set-filtering-conditions-row-set-spec
              sm={4}
              className={css.SetCell}
            >
              <FormattedMessage id="ui-oai-pmh.settings.sets.view.filteringConditions.field.value.ariaLabel">
                {(ariaLabel) => (
                  <Field
                    id={`${FILTERING_CONDITIONS_FIELDS.SET_SPEC}${index}`}
                    name={`${filteringCondition}.${FILTERING_CONDITIONS_FIELDS.SET_SPEC}`}
                    aria-label={ariaLabel}
                    type="text"
                    validate={() => validateSetSpec(index, fields)}
                    component={TextField}
                    disabled={!fields.value[index][FILTERING_CONDITIONS_FIELDS.ACTIVE]}
                  />
                )}
              </FormattedMessage>
            </Col>
          </Row>
        ))}
      </FieldArray>
    </Accordion>
  );
};

FilteringConditions.propTypes = {
  filteringConditionsDataOptions: PropTypes.object.isRequired,
};

export default FilteringConditions;
