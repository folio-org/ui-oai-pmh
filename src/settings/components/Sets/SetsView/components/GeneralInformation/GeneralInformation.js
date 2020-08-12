import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';

import {
  GENERAL_ACCORDION_NAME,
  METADATA_ACCORDION_NAME,
  SET_FIELDS,
} from '../../../../../constants';

const EMPTY_VALUE = '-';

const getValue = (value) => (value || EMPTY_VALUE);

const GeneralInformation = ({
  sets,
}) => {
  return (
    <Accordion
      id={GENERAL_ACCORDION_NAME}
      label={<FormattedMessage id="ui-oai-pmh.settings.sets.view.accordion.generalInformation.title" />}
    >
      <Row>
        <Col sm={12}>
          <ViewMetaData
            id={METADATA_ACCORDION_NAME}
            metadata={sets[SET_FIELDS.METADATA]}
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <KeyValue
            data-test-set-view-fields-name
            label={<FormattedMessage id="ui-oai-pmh.settings.sets.view.field.name" />}
            value={sets[SET_FIELDS.NAME]}
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <KeyValue
            data-test-set-view-fields-description
            label={<FormattedMessage id="ui-oai-pmh.settings.sets.view.field.description" />}
            value={getValue(sets[SET_FIELDS.DESCRIPTION])}
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <KeyValue
            data-test-set-view-fields-set-spec
            label={<FormattedMessage id="ui-oai-pmh.settings.sets.view.field.setSpec" />}
            value={sets[SET_FIELDS.SET_SPEC]}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

GeneralInformation.propTypes = {
  sets: PropTypes.object.isRequired,
};

export default GeneralInformation;
