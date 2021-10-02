import React from 'react';
import useLocationReset from './useLocationReset';


describe('useLocalcationReset', () => {
  it('shoud call reset function', () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce(f => f());
    const resetMock = jest.fn();
    const history = {
      action: 'REPLACE'
    };

    const location = {
      pathname: '/test/'
    };

    useLocationReset(history, location, '/test/', resetMock);

    expect(resetMock).toHaveBeenCalled();
  });
});
