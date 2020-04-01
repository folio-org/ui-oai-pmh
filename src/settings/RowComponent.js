import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Col,
  Row,
  Tooltip,
} from '@folio/stripes/components';

export default class RowComponent extends Component {
  constructor(props) {
    super(props);

    this.rowComponent = React.createRef();
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    // Additional options for select box
    dataOptions: PropTypes.array,
    component: PropTypes.node.isRequired,
  };

  static defaultProps = {
    dataOptions: [],
  };

  render() {
    const {
      id,
      label,
      tooltip,
      component,
    } = this.props;

    return (
      <Row>
        <Col xs={12}>
          <div
            id={`${id}-tooltip-content`}
            name={`${id}-tooltip-content`}
            aria-labelledby={`${id}-tooltip-text`}
            ref={this.rowComponent}
          >
            <Field
              {...this.props}
              id={id}
              name={id}
              label={<FormattedMessage id={label} />}
              component={component}
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
