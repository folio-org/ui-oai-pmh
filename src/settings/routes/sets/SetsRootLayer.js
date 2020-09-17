import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  stripesConnect,
} from '@folio/stripes-core';

import SetsContext from './SetsContext';
import {
  useCallout,
} from '../../hooks';
import {
  CALLOUT_ERROR_TYPE,
} from '../../constants';

const SetsRootLayer = ({
  children,
  mutator,
}) => {
  const [setsFilteringConditions, setSetsFilteringConditions] = useState([]);

  const showCallout = useCallout();

  useEffect(
    () => {
      mutator.setsFilteringConditions.GET()
        .then(response => {
          setSetsFilteringConditions(response.setsFilteringConditions);
        })
        .catch(() => {
          showCallout({
            type: CALLOUT_ERROR_TYPE,
            message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.connectionProblem.get" />,
          });
        });
    }, [showCallout]
  );

  return (
    <SetsContext.Provider value={{ setsFilteringConditions }}>
      {children}
    </SetsContext.Provider>
  );
};

SetsRootLayer.manifest = Object.freeze({
  setsFilteringConditions: {
    type: 'okapi',
    path: 'oai-pmh/filtering-conditions',
    accumulate: 'true',
    fetch: false,
  },
});

SetsRootLayer.propTypes = {
  children: PropTypes.node.isRequired,
  mutator: PropTypes.shape({
    setsFilteringConditions: PropTypes.shape({
      GET: PropTypes.func.isRequired,
    }),
  }),
};

export default stripesConnect(SetsRootLayer);
