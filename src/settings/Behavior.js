import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  stripesShape,
  withStripes,
} from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import BehaviorForm from './BehaviorForm';
import {
  getObjectFromResponseString,
  dataObjectToString,
} from './util';

class Behavior extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
  };

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);
  }

  getInitialValues(data) {
    return getObjectFromResponseString(data);
  }

  normalize = (data) => {
    return dataObjectToString(data);
  };

  render() {
    return (
      <this.configManager
        label={<FormattedMessage id="ui-oai-pmh.settings.behavior" />}
        moduleName="OAIPMH"
        configName="behavior"
        getInitialValues={this.getInitialValues}
        configFormComponent={BehaviorForm}
        stripes={this.props.stripes}
        onBeforeSave={this.normalize}
      />
    );
  }
}

export default withStripes(Behavior);
