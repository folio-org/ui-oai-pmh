import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import SetsContext from './SetsContext';
import {
  useCallout,
} from '../../hooks';
import {
  CALLOUT_ERROR_TYPE,
} from '../../constants';
import { useFilteringConditions } from '../../hooks/useFilteringConditions';

const SetsRootLayer = ({ children }) => {
  const showCallout = useCallout();

  const { conditions } = useFilteringConditions({
    onError: () => {
      showCallout({
        type: CALLOUT_ERROR_TYPE,
        message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.connectionProblem.get" />,
      });
    },
  });

  const [setsFilteringConditions, setSetsFilteringConditions] = useState([]);

  useEffect(() => {
    if (conditions?.length > 0) {
      setSetsFilteringConditions(conditions);
    }
  }, [conditions]);

  return (
    <SetsContext.Provider value={{ setsFilteringConditions }}>
      {children}
    </SetsContext.Provider>
  );
};

SetsRootLayer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SetsRootLayer;
