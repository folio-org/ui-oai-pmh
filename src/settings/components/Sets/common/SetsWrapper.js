import React from 'react';
import PropTypes from 'prop-types';

import {
  Layer,
} from '@folio/stripes/components';

const SetWrapper = ({ children }) => {
  return (
    <Layer
      contentLabel="setLayer"
      isOpen
    >
      {children}
    </Layer>
  );
};

SetWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SetWrapper;
