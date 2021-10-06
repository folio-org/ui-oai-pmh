import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../../../../test/jest/__mock__';

import EntityNotFound from './EntityNotFound';
import SetWrapper from './SetsWrapper';

const onBackMock = jest.fn();

const renderSetCountainer = () => {
  render(
    <SetWrapper>
      <EntityNotFound
        pageTitleTranslationKey="titleKey"
        errorTextTranslationKey="errorKey"
        paneWidth={800}
        onBack={onBackMock}
      />
    </SetWrapper>
  );
};

describe('Sets empty', () => {
  it('should be correct title', () => {
    renderSetCountainer();

    expect(screen.getByText('titleKey')).toBeVisible();
  });

  it('should be correct error description', () => {
    renderSetCountainer();

    expect(screen.getByText('errorKey')).toBeVisible();
  });

  it('should be call onBack function', () => {
    renderSetCountainer();

    userEvent.click(screen.getByRole('button', { name: 'stripes-components.closeItem' }));

    expect(onBackMock).toHaveBeenCalled();
  });
});
