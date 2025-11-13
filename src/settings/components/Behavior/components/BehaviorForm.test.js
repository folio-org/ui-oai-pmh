import React from 'react';
import { screen } from '@testing-library/react';

import { runAxeTest } from '@folio/stripes-testing';

import '../../../../../test/jest/__mock__';
import { renderWithRouter } from '../../../../../test/jest/helpers';
import BehaviorForm from './BehaviorForm';
import { useConfiguration } from '../../../hooks';

const onSubmitMock = jest.fn();
const labelText = 'ui-oai-pmh.settings.behavior.title';


jest.mock('../../../hooks/useConfiguration');

const renderBehaviorForm = () => renderWithRouter(
  <BehaviorForm
    onSubmit={onSubmitMock}
    label={labelText}
    submitting
    pristine={false}
  />
);

describe('Behavior form', () => {
  beforeEach(() => {
    useConfiguration.mockReturnValue({
      config: undefined,
      isConfigsLoading: false,
    });
  });

  afterEach(() => {
    useConfiguration.mockClear();
  });

  it('should be correct behavior title', () => {
    renderBehaviorForm();

    expect(screen.getByText(labelText)).toBeVisible();
  });

  it('should render with no axe errors', async () => {
    renderBehaviorForm();

    await runAxeTest({
      rootNode: document.body,
    });
  });

  it('should be presented deleted records support', () => {
    renderBehaviorForm();

    expect(screen.getByText(/behavior.tooltip.deletedRecordsSupport/)).toBeVisible();
  });

  it('should be presented suppressed records processing', () => {
    renderBehaviorForm();

    expect(screen.getByText(/behavior.tooltip.suppressedRecordsProcessing/)).toBeVisible();
  });

  it('should be presented errors processing', () => {
    renderBehaviorForm();

    expect(screen.getByText(/behavior.tooltip.errorsProcessing/)).toBeVisible();
  });

  it('should render oai notification', () => {
    renderBehaviorForm();

    expect(screen.getByTestId('oai-notification')).toBeInTheDocument();
  });

  it('should be enable button save', () => {
    renderBehaviorForm();

    expect(screen.getByRole('button', { name: /save/ })).toBeEnabled();
  });

  it('should be presented records source', () => {
    renderBehaviorForm();

    expect(screen.getByText(/behavior.tooltip.recordSource/)).toBeVisible();
  });
});
