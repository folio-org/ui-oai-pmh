import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedDate,
  FormattedMessage,
  FormattedTime,
} from 'react-intl';

import {
  MultiColumnList,
  Pane,
} from '@folio/stripes/components';

import LastMenu from './components';
import {
  FILL_PANE_WIDTH,
  PAGE_AMOUNT,
  SET_FIELDS,
} from '../../../constants';

const columnMapping = {
  [SET_FIELDS.NAME]: <FormattedMessage id="ui-oai-pmh.settings.sets.list.field.name" />,
  [SET_FIELDS.SET_SPEC]: <FormattedMessage id="ui-oai-pmh.settings.sets.list.field.setSpec" />,
  [SET_FIELDS.DESCRIPTION]: <FormattedMessage id="ui-oai-pmh.settings.sets.list.field.description" />,
  [SET_FIELDS.UPDATED_DATE]: <FormattedMessage id="ui-oai-pmh.settings.sets.list.field.updatedDate" />,
};

const visibleColumns = [
  SET_FIELDS.NAME,
  SET_FIELDS.SET_SPEC,
  SET_FIELDS.DESCRIPTION,
  SET_FIELDS.UPDATED_DATE,
];

const resultsFormatter = () => ({
  [SET_FIELDS.UPDATED_DATE]: (data) => (
    <FormattedMessage
      id="ui-oai-pmh.settings.sets.list.field.updatedDatePattern"
      values={{
        date: <FormattedDate value={data[SET_FIELDS.UPDATED_DATE]} />,
        time: <FormattedTime value={data[SET_FIELDS.UPDATED_DATE]} />,
      }}
    />
  ),
});

const columnWidths = {
  [SET_FIELDS.NAME]: '25%',
  [SET_FIELDS.SET_SPEC]: '25%',
  [SET_FIELDS.DESCRIPTION]: '25%',
  [SET_FIELDS.UPDATED_DATE]: '25%',
};

const SetsList = ({
  isLoading,
  totalCount,
  sets,
  onRowClick,
  onNeedMoreData,
}) => {
  return (
    <Pane
      data-sets-list
      defaultWidth={FILL_PANE_WIDTH}
      paneTitle={<FormattedMessage id="ui-oai-pmh.settings.sets.list.title" />}
      lastMenu={<LastMenu />}
    >
      <MultiColumnList
        id="setList"
        autosize
        virtualize
        loading={isLoading}
        pageAmount={PAGE_AMOUNT}
        pagingType="click"
        totalCount={totalCount}
        isEmptyMessage={<FormattedMessage id="ui-oai-pmh.settings.sets.list.no.sets" />}
        contentData={sets}
        columnMapping={columnMapping}
        visibleColumns={visibleColumns}
        columnWidths={columnWidths}
        formatter={resultsFormatter()}
        onRowClick={onRowClick}
        onNeedMoreData={onNeedMoreData}
      />
    </Pane>
  );
};

SetsList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  totalCount: PropTypes.number.isRequired,
  sets: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func.isRequired,
  onNeedMoreData: PropTypes.func.isRequired,
};

export default SetsList;
