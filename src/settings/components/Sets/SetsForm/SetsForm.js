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

import css from './SetsForm.css';

const SetsForm = ({
  pristine,
  submitting,
  handleSubmit,
  stripes,
  form,
  formTitle,
  metadata,
  onBack,
  filteringConditionsDataOptions,
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
      onSubmit={handleSubmit}
      onBack={onBack}
    />
  );

  return (
    <SetsWrapper>
      <form
        id="setsForm"
        className={css.SetsForm}
      >
        <Paneset isRoot>
          <Pane
            data-test-sets-form
            defaultWidth={FILL_PANE_WIDTH}
            paneTitle={formTitle()}
            firstMenu={getFirstMenu()}
            onClose={reset}
            footer={getFooter()}
          >
            <div className={css.SetsFormContent}>
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
                  <FilteringConditions filteringConditionsDataOptions={filteringConditionsDataOptions} />
                </AccordionSet>
              </AccordionStatus>
            </div>
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
  filteringConditionsDataOptions: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

SetsForm.defaultProps = {
  metadata: null
};

export default stripesFinalForm({
  keepDirtyOnReinitialize: true,
  validateOnBlur: true,
  navigationCheck: true,
})(SetsForm);
