import '@testing-library/jest-dom';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useFeature } from '../src';
import FlagsContext from '../src/context';

const flags = [{
  id: 'test',
  projectId: 'test',
  name: 'test-feature-active',
  description: 'test',
  isActive: true,
  isArchived: false,
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
}, {
  id: 'test',
  projectId: 'test',
  name: 'test-feature-not-active',
  description: 'test',
  isActive: false,
  isArchived: false,
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
}];

describe('useFeature', () => {
  it('should return true if the flag {name} is active', async () => {
    const { result } = renderHook(() => useFeature('test-feature-active'), {
      wrapper: ({ children }) => (
        <FlagsContext.Provider value={flags}>
          {children}
        </FlagsContext.Provider>
      ),
    });
    expect(result.current).toStrictEqual(true);
  });
  it('should return true if the flag {name} is not active', async () => {
    const { result } = renderHook(() => useFeature('test-feature-not-active'), {
      wrapper: ({ children }) => (
        <FlagsContext.Provider value={flags}>
          {children}
        </FlagsContext.Provider>
      ),
    });
    expect(result.current).toStrictEqual(false);
  });
  it('should return true if the flag {name} is don\'t exists', async () => {
    const { result } = renderHook(() => useFeature('test-feature-not-exists'), {
      wrapper: ({ children }) => (
        <FlagsContext.Provider value={flags}>
          {children}
        </FlagsContext.Provider>
      ),
    });
    expect(result.current).toStrictEqual(false);
  });
});
