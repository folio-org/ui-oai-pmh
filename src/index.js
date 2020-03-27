import React from 'react';

import { stripesShape } from '@folio/stripes/core';

import Settings from './settings';

class OaiPmh extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
  };

  render() {
    return (
      <Settings {...this.props} />
    );
  }
}

export default OaiPmh;
