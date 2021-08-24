import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Feature } from '../src';
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

describe('<Feature />', () => {
  it('should render the {children} when the flag {name} is active', async () => {
    render(
      <FlagsContext.Provider value={flags}>
        <Feature name="test-feature-active">
          Hello World
        </Feature>
      </FlagsContext.Provider>
    );
    const element = await waitFor(() => screen.findByText('Hello World'));
    expect(element).toHaveTextContent('Hello World');
  });
  it('should render the {fallback} when the flag {name} is not active', async () => {
    render(
      <FlagsContext.Provider value={flags}>
        <Feature name="test-feature-not-active" fallback={<span>Not Hello World</span>}>
          Hello World
        </Feature>
      </FlagsContext.Provider>
    );
    const element = await waitFor(() => screen.findByText('Not Hello World'));
    expect(element).toHaveTextContent('Not Hello World');
  });
  it('should render the {fallback} when the flag {name} don\' exists', async () => {
    render(
      <FlagsContext.Provider value={flags}>
        <Feature name="test-feature-don't exists" fallback={<span>Not Hello World</span>}>
          Hello World
        </Feature>
      </FlagsContext.Provider>
    );
    const element = await waitFor(() => screen.findByText('Not Hello World'));
    expect(element).toHaveTextContent('Not Hello World');
  });
  it('should not render the {children} when the flag {name} is not active', async () => {
    render(
      <FlagsContext.Provider value={flags}>
        <Feature name="test-feature-not-active" fallback={<span>Not Hello World</span>}>
          Hello World
        </Feature>
      </FlagsContext.Provider>
    );
    await waitFor(() => screen.findByText('Not Hello World'));
    try {
      await screen.findByText('Hello World');
      fail();
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });
  it('should not render the {children} when the flag {name} don\'t exists', async () => {
    render(
      <FlagsContext.Provider value={flags}>
        <Feature name="test-feature-not-exists" fallback={<span>Not Hello World</span>}>
          Hello World
        </Feature>
      </FlagsContext.Provider>
    );
    await waitFor(() => screen.findByText('Not Hello World'));
    try {
      await screen.findByText('Hello World');
      fail();
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });
});
