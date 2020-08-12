import React from 'react';
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

import {
  GENERAL_ACCORDION_NAME,
  METADATA_ACCORDION_NAME,
  SET_FIELDS,
} from '../../../../../constants';

const GeneralInformation = ({
  metadata,
}) => {
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
          sm={8}
        >
          <Field
            required
            id={SET_FIELDS.NAME}
            name={SET_FIELDS.NAME}
            type="text"
            label={<FormattedMessage id="ui-oai-pmh.settings.sets.edit.field.name" />}
            component={TextField}
          />
        </Col>
      </Row>
      <Row>
        <Col
          data-test-set-fields-description
          sm={8}
        >
          <Field
            id={SET_FIELDS.DESCRIPTION}
            name={SET_FIELDS.DESCRIPTION}
            type="text"
            label={<FormattedMessage id="ui-oai-pmh.settings.sets.edit.field.description" />}
            component={TextArea}
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
