import { useContext } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import '../../../test/jest/__mock__';

import useCallout from './useCallout';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('useShowCallout', () => {
  let callout;

  beforeEach(() => {
    useContext.mockClear();

    callout = {
      sendCallout: jest.fn(),
    };
  });

  it('should not send message when returned function is called and callout if not defined in context', () => {
    useContext.mockReturnValue(undefined);

    const { result } = renderHook(() => useCallout());
    const showCallout = result.current;

    showCallout({ message: 'Empty error' });

    expect(callout.sendCallout).not.toHaveBeenCalled();
  });

  it('should send message when returned function is called and callout is in context', () => {
    useContext.mockReturnValue(callout);

    const { result } = renderHook(() => useCallout());
    const showCallout = result.current;

    showCallout({ message: 'notUnique' });

    expect(callout.sendCallout).toHaveBeenCalled();
  });

  it('should not translate message when send is called with message field', () => {
    useContext.mockReturnValue(callout);

    const { result } = renderHook(() => useCallout());
    const showCallout = result.current;
    const message = 'notUnique';

    showCallout({ message });

    expect(callout.sendCallout.mock.calls[0][0].message).toBe(message);
  });

  it('should use success type by default when send is called', () => {
    useContext.mockReturnValue(callout);

    const { result } = renderHook(() => useCallout());
    const showCallout = result.current;

    showCallout({ message: 'notUnique' });

    expect(callout.sendCallout.mock.calls[0][0].type).toBe('success');
  });

  it('should called with error type', () => {
    useContext.mockReturnValue(callout);

    const { result } = renderHook(() => useCallout());
    const showCallout = result.current;

    showCallout({ type: 'error' });

    expect(callout.sendCallout.mock.calls[0][0].type).toBe('error');
  });
});
