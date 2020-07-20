import React, {
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import {
  Pane,
  Paneset,
  AccordionSet,
  AccordionStatus,
  ExpandAllButton,
  Row,
  Col,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  FilteringConditions,
  FirstMenu,
  GeneralInformation,
  SetsFormPaneFooter,
} from './components';
import {
  SetsWrapper,
} from '../common';
import {
  FILL_PANE_WIDTH,
  INITIAL_ACCORDION_STATE,
} from '../../../constants';

import css from '../../common/Form.css';

const SetsForm = ({
  pristine,
  submitting,
  handleSubmit,
  stripes,
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

  const getFooter = () => (
    <SetsFormPaneFooter
      pristine={pristine}
      submitting={submitting}
      stripes={stripes}
      onBack={onBack}
    />
  );

  return (
    <SetsWrapper>
      <form
        id="setsForm"
        className={css.form}
        onSubmit={handleSubmit}
      >
        <Paneset isRoot>
          <Pane
            data-sets-form
            defaultWidth={FILL_PANE_WIDTH}
            paneTitle={formTitle()}
            firstMenu={getFirstMenu()}
            onClose={reset}
            footer={getFooter()}
          >
            <AccordionStatus>
              <Row end="xs">
                <Col
                  data-test-expand-all-button
                  xs
                >
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
    </SetsWrapper>
  );
};

SetsForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
  }).isRequired,
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
