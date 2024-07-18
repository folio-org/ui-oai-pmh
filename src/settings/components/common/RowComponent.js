import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { omit, pick } from 'lodash';

import { Col, Row, Tooltip } from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';


const RowComponent = ({
  id,
  label,
  tooltip,
  dataOptions = [],
  component,
  ...props
}) => {
  const stripes = useStripes();
  const rowComponent = useRef(null);

  const hasEditPerm = stripes.hasPerm('ui-oai-pmh.edit');
  const fieldPropsAttributeNames = ['id', 'required', 'type', 'component', 'dataOptions'];
  const fieldProps = pick({ id, required: props.required, type: props.type, component, dataOptions }, fieldPropsAttributeNames);
  const dataTest = omit(props, [...fieldPropsAttributeNames, 'label', 'tooltip']);

  return (
    <Row>
      <Col xs={12}>
        <div
          id={`${id}-tooltip-content`}
          name={`${id}-tooltip-content`}
          aria-labelledby={`${id}-tooltip-text`}
          ref={rowComponent}
          {...dataTest}
        >
          <Field
            {...fieldProps}
            name={id}
            label={<FormattedMessage id={label} />}
            disabled={!hasEditPerm}
          />
        </div>
        {tooltip && (
          <Tooltip
            id={`${id}-tooltip`}
            name={`${id}-tooltip`}
            text={<FormattedMessage id={tooltip} />}
            triggerRef={rowComponent}
          />
        )}
      </Col>
    </Row>
  );
};

RowComponent.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  dataOptions: PropTypes.arrayOf(PropTypes.object),
  component: PropTypes.node.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
};

export default RowComponent;
