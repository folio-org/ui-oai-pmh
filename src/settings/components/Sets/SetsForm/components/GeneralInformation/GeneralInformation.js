import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  Row,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';

import {
  GENERAL_ACCORDION_NAME,
  METADATA_ACCORDION_NAME,
} from '../../../../../constants';

const GeneralInformation = ({
  metadata,
}) => {
  return (
    <Accordion
      id={GENERAL_ACCORDION_NAME}
      label={<FormattedMessage id="ui-oai-pmh.settings.sets.accordion.generalInformation.title" />}
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
          sm={12}
        >
          <FormattedMessage id="ui-oai-pmh.settings.sets.accordion.generalInformation.title" />
        </Col>
      </Row>
    </Accordion>
  );
};

GeneralInformation.propTypes = {
  metadata: PropTypes.object,
};

export default GeneralInformation;
