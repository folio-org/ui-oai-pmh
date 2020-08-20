import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import css from './FilteringConditionsTitle.css';

const FilteringConditionsTitle = () => {
  return (
    <Row className={css.header}>
      <Col
        data-test-filtering-conditions-title-name
        className={css.headerCell}
        sm={3}
      >
        <FormattedMessage id="ui-oai-pmh.settings.sets.edit.filteringConditions.field.name" />
      </Col>
      <Col
        data-test-filtering-conditions-title-active
        className={css.headerCell}
        sm={1}
      >
        <FormattedMessage id="ui-oai-pmh.settings.sets.edit.filteringConditions.field.active" />
      </Col>
      <Col
        data-test-filtering-conditions-title-value
        className={css.headerCell}
        sm={4}
      >
        <FormattedMessage id="ui-oai-pmh.settings.sets.edit.filteringConditions.field.value" />
      </Col>
      <Col
        data-test-filtering-conditions-title-set-spec
        className={css.headerCell}
        sm={4}
      >
        <FormattedMessage id="ui-oai-pmh.settings.sets.edit.filteringConditions.field.setSpec" />
      </Col>
    </Row>
  );
};

export default FilteringConditionsTitle;
