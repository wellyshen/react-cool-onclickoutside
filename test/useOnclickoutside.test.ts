import { renderHook, act } from '@testing-library/react-hooks';

import useOnclickoutside from '../src/useOnclickoutside';

describe('useOnclickoutside', () => {
  it('should...', () => {
    const { result } = renderHook(() => useOnclickoutside(() => null));

    act(() => {
      result.current(document.createElement('div'));
    });
  });
});
