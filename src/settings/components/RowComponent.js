import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import {
  omit,
  pick,
} from 'lodash';

import {
  Col,
  Row,
  Tooltip,
} from '@folio/stripes/components';

export default class RowComponent extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    // Additional options for select box
    dataOptions: PropTypes.arrayOf(PropTypes.object),
    component: PropTypes.node.isRequired,
  };

  static defaultProps = {
    dataOptions: [],
  };

  constructor(props) {
    super(props);

    this.rowComponent = React.createRef();
  }

  render() {
    const {
      id,
      label,
      tooltip,
    } = this.props;
    const fieldPropsAttributeNames = ['id', 'required', 'type', 'component', 'dataOptions'];
    const fieldProps = pick(this.props, fieldPropsAttributeNames);
    const dataTest = omit(this.props, [...fieldPropsAttributeNames, 'label', 'tooltip']);

    return (
      <Row>
        <Col xs={12}>
          <div
            id={`${id}-tooltip-content`}
            name={`${id}-tooltip-content`}
            aria-labelledby={`${id}-tooltip-text`}
            ref={this.rowComponent}
            {...dataTest}
          >
            <Field
              {...fieldProps}
              name={id}
              label={<FormattedMessage id={label} />}
            />
          </div>
          {tooltip &&
            <Tooltip
              id={`${id}-tooltip`}
              name={`${id}-tooltip`}
              text={<FormattedMessage id={tooltip} />}
              triggerRef={this.rowComponent}
            />
          }
        </Col>
      </Row>
    );
  }
}
