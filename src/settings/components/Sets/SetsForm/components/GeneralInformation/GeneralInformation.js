import React, {
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Accordion,
  Col,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';

import SetSpecification from './components/SetSpecification';

import {
  TEXT_FIELD_MAX_FIELD_LENGTH,
  TEXT_AREA_FIELD_MAX_FIELD_LENGTH,
  GENERAL_ACCORDION_NAME,
  METADATA_ACCORDION_NAME,
  SET_FIELDS,
} from '../../../../../constants';

import {
  validateRequiredField,
  validateFieldLength,
  composeValidators,
} from '../../../../../util';

const validateNameLength = (value) => validateFieldLength(value, TEXT_FIELD_MAX_FIELD_LENGTH);
const validateDescriptionLength = (value) => validateFieldLength(value, TEXT_AREA_FIELD_MAX_FIELD_LENGTH);

const GeneralInformation = ({
  metadata,
}) => {
  const validateName = useMemo(() => composeValidators(validateRequiredField, validateNameLength), []);

  return (
    <Accordion
      id={GENERAL_ACCORDION_NAME}
      label={<FormattedMessage id="ui-oai-pmh.settings.sets.edit.accordion.generalInformation.title" />}
    >
      {metadata && (
        <Row>
          <Col sm={12}>
            <ViewMetaData
              id={METADATA_ACCORDION_NAME}
              metadata={metadata}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col
          data-test-set-fields-name
          sm={6}
        >
          <Field
            required
            id={SET_FIELDS.NAME}
            name={SET_FIELDS.NAME}
            type="text"
            label={<FormattedMessage id="ui-oai-pmh.settings.sets.edit.field.name" />}
            validate={validateName}
            component={TextField}
          />
        </Col>
      </Row>
      <Row>
        <Col
          data-test-set-fields-description
          sm={6}
        >
          <Field
            id={SET_FIELDS.DESCRIPTION}
            name={SET_FIELDS.DESCRIPTION}
            type="text"
            label={<FormattedMessage id="ui-oai-pmh.settings.sets.edit.field.description" />}
            validate={validateDescriptionLength}
            component={TextArea}
          />
        </Col>
      </Row>
      <Row>
        <Col
          data-test-set-fields-set-specification
          sm={6}
        >
          <Field
            id={SET_FIELDS.SET_SPEC}
            name={SET_FIELDS.FILTERING_CONDITIONS}
            type="text"
            label={<FormattedMessage id="ui-oai-pmh.settings.sets.edit.field.setSpecification" />}
            component={SetSpecification}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

GeneralInformation.propTypes = {
  metadata: PropTypes.object,
};

export default GeneralInformation;
