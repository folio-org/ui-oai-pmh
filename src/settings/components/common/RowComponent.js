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
  disabled: disabledProp,
  disabledTooltip,
  ...props
}) => {
  const stripes = useStripes();
  const rowComponent = useRef(null);

  const hasEditPerm = stripes.hasPerm('ui-oai-pmh.settings.edit');
  const isDisabled = disabledProp !== undefined ? (disabledProp || !hasEditPerm) : !hasEditPerm;
  const fieldPropsAttributeNames = ['id', 'required', 'type', 'component', 'dataOptions', 'format'];
  const fieldProps = pick({ id, required: props.required, type: props.type, component, dataOptions, format: props.format }, fieldPropsAttributeNames);
  const dataTest = omit(props, [...fieldPropsAttributeNames, 'label', 'tooltip']);

  const boldTag = (chunks) => <b>{chunks}</b>;
  const showDisabledTooltip = isDisabled && disabledTooltip;
  const activeTooltip = showDisabledTooltip ? disabledTooltip : tooltip;

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
            label={
              <FormattedMessage
                id={label}
                values={{ b: boldTag }}
              />
            }
            disabled={isDisabled}
          />
        </div>
        {activeTooltip && (
          <Tooltip
            id={`${id}-tooltip`}
            name={`${id}-tooltip`}
            text={
              <FormattedMessage
                id={activeTooltip}
                values={{ b: boldTag }}
              />
            }
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
  disabled: PropTypes.bool,
  disabledTooltip: PropTypes.string,
};

export default RowComponent;
