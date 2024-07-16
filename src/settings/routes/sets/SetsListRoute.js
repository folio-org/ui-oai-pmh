import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { LoadingPane } from '@folio/stripes/components';

import {
  SetsList,
} from '../../components/Sets';
import {
  PAGE_AMOUNT,
  CALLOUT_ERROR_TYPE,
  DEFAULT_PANE_WIDTH,
  SET_FIELDS,
} from '../../constants';
import {
  getSetsViewUrl,
} from '../../util';
import {
  useCallout,
} from '../../hooks';
import { useSets } from '../../hooks/useSets';


const SetsListRoute = ({ children }) => {
  const showCallout = useCallout();
  const history = useHistory();
  const { search } = history.location;

  const [offset, setOffset] = useState(0);

  const { sets, isSetsLoading, totalRecords, fetchNextPage, hasNextPage } = useSets({
    offset,
    onError: () => {
      showCallout({
        type: CALLOUT_ERROR_TYPE,
        message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.connectionProblem.get" />,
      });
    }
  });

  const onNeedMoreData = () => {
    setOffset((prevOffset) => prevOffset + PAGE_AMOUNT);

    fetchNextPage();
  };

  const onRowClick = (e, meta) => {
    history.push({
      pathname:  getSetsViewUrl(meta[SET_FIELDS.ID]),
      search,
    });
  };


  if (isSetsLoading) {
    return (
      <LoadingPane defaultWidth={DEFAULT_PANE_WIDTH} />
    );
  }

  return (
    <SetsList
      sets={sets}
      onRowClick={onRowClick}
      totalCount={totalRecords}
      onNeedMoreData={onNeedMoreData}
      loading={isSetsLoading}
      hasNextPage={hasNextPage}
    >
      { children }
    </SetsList>
  );
};

SetsListRoute.propTypes = {
  children: PropTypes.node,
};

export default SetsListRoute;
