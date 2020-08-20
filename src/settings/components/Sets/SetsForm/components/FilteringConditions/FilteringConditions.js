import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
} from '@folio/stripes/components';

import {
  FILTERING_CONDITIONS_ACCORDION_NAME,
} from '../../../../../constants';

const FilteringConditions = () => {
  return (
    <Accordion
      id={FILTERING_CONDITIONS_ACCORDION_NAME}
      label={<FormattedMessage id="ui-oai-pmh.settings.sets.edit.accordion.filteringConditions.title" />}
    >
      <FormattedMessage id="ui-oai-pmh.settings.sets.edit.accordion.filteringConditions.title" />
    </Accordion>
  );
};

export default FilteringConditions;
