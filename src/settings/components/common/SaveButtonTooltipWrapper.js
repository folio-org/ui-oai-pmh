import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Tooltip } from '@folio/stripes/components';


const SaveButton = ({ showTooltip, children }) => {
  const saveButtonRef = useRef();

  const ariaLabelledby = showTooltip ? { 'aria-labelledby': 'save-button-tooltip-text' } : {};

  return (
    <>
      <div
        id="save-button-tooltip-content"
        name="save-button-tooltip-content"
        {...ariaLabelledby}
        ref={saveButtonRef}
      >
        {children}
      </div>
      {showTooltip && (
        <Tooltip
          id="save-button-tooltip"
          name="save-button-tooltip"
          text={<FormattedMessage id="ui-oai-pmh.settings.all.saveButton.lackPermissions" />}
          triggerRef={saveButtonRef}
        />
      )}
    </>
  );
};

SaveButton.propTypes = {
  showTooltip: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default SaveButton;
