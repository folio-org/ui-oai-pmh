import React, {
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import {
  AccordionSet,
  AccordionStatus,
  Col,
  Layer,
  Pane,
  Paneset,
  Row,
  ExpandAllButton,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  GeneralInformation,
  FilteringConditions,
  FirstMenu,
} from './components';
import {
  FILL_PANE_WIDTH,
  INITIAL_ACCORDION_STATE,
} from '../../../constants';

const SetsForm = ({
  form,
  formTitle,
  metadata,
  onBack,
}) => {
  const {
    reset,
  } = form;

  const getFirstMenu = useCallback(() => (
    <FirstMenu onClickHandler={onBack} />
  ), [onBack]);

  return (
    <Layer
      contentLabel="sets-form"
      isOpen
    >
      <form>
        <Paneset isRoot>
          <Pane
            data-sets-form
            defaultWidth={FILL_PANE_WIDTH}
            paneTitle={formTitle()}
            firstMenu={getFirstMenu()}
            onClose={reset}
          >
            <AccordionStatus>
              <Row end="xs">
                <Col xs>
                  <ExpandAllButton />
                </Col>
              </Row>
              <AccordionSet initialStatus={INITIAL_ACCORDION_STATE}>
                <GeneralInformation metadata={metadata} />
                <FilteringConditions />
              </AccordionSet>
            </AccordionStatus>
          </Pane>
        </Paneset>
      </form>
    </Layer>
  );
};

SetsForm.propTypes = {
  form: PropTypes.shape({
    change: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }),
  formTitle: PropTypes.func.isRequired,
  metadata: PropTypes.object,
  onBack: PropTypes.func.isRequired,
};

SetsForm.defaultProps = {
  metadata: null
};

export default stripesFinalForm({
  navigationCheck: true,
})(SetsForm);
