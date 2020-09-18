import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FormattedMessage } from 'react-intl';

import {
  stripesConnect,
} from '@folio/stripes/core';
import {
  LoadingPane,
} from '@folio/stripes/components';

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
  getSetsListUrl,
} from '../../util';
import {
  useCallout,
  useLocationReset,
} from '../../hooks';

const SetsListRoute = ({
  history,
  location,
  mutator,
  children,
}) => {
  const [sets, setSets] = useState([]);
  const [setsCount, setSetsCount] = useState(0);
  const [setsOffset, setSetsOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const showCallout = useCallout();

  const loadSets = (offset) => {
    setIsLoading(true);

    return mutator.setsRecords.GET({
      params: {
        limit: PAGE_AMOUNT,
        offset,
      }
    })
      .then(setsResponse => {
        if (!offset) {
          setSetsCount(setsResponse.totalRecords);
        }

        setSets((prev) => [...prev, ...setsResponse.sets]);
      })
      .catch(() => {
        showCallout({
          type: CALLOUT_ERROR_TYPE,
          message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.connectionProblem.get" />,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const onNeedMoreData = useCallback(
    () => {
      const newOffset = setsOffset + PAGE_AMOUNT;

      loadSets(newOffset)
        .then(() => {
          setSetsOffset(newOffset);
        });
    },
    [setsOffset],
  );

  const refreshList = () => {
    setSets([]);
    setSetsCount(0);
    setSetsOffset(0);
    loadSets(0);
  };

  useEffect(
    () => {
      refreshList();
    },
    [],
  );

  useLocationReset(history, location, getSetsListUrl(), refreshList);

  const onRowClick = useCallback((e, meta) => {
    history.push({
      pathname:  getSetsViewUrl(meta[SET_FIELDS.ID]),
      search: location.search,
    });
  }, [history, location.search]);

  const isInitialLoading = isLoading && !sets.length;

  if (isInitialLoading) {
    return (
      <LoadingPane defaultWidth={DEFAULT_PANE_WIDTH} />
    );
  }

  return (
    <SetsList
      sets={sets}
      onRowClick={onRowClick}
      totalCount={setsCount}
      onNeedMoreData={onNeedMoreData}
      loading={isLoading}
    >
      { children }
    </SetsList>
  );
};

SetsListRoute.manifest = Object.freeze({
  setsRecords: {
    type: 'okapi',
    path: 'oai-pmh/sets',
    fetch: false,
    accumulate: true,
  },
});

SetsListRoute.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  mutator: PropTypes.shape({
    setsRecords: PropTypes.shape({
      GET: PropTypes.func.isRequired,
    }),
  }),
  children: PropTypes.node,
};

export default stripesConnect(SetsListRoute);
