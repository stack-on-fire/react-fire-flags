import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { mockFetchWithJsonValue } from './test-utils';
import { Feature, FireFlags } from '../src';

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
    mockFetchWithJsonValue(flags);
    render(
      <FireFlags projectId="test">
        <Feature name="test-feature-active">
          Hello World
        </Feature>
      </FireFlags>
    );
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const element = await waitFor(() => screen.findByText('Hello World'));
    expect(element).toHaveTextContent('Hello World');
  });
  it('should render the {fallback} when the flag {name} is not active', async () => {
    mockFetchWithJsonValue(flags);
    render(
      <FireFlags projectId="test">
        <Feature name="test-feature-not-active" fallback={<span>Not Hello World</span>}>
          Hello World
        </Feature>
      </FireFlags>
    );
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const element = await waitFor(() => screen.findByText('Not Hello World'));
    expect(element).toHaveTextContent('Not Hello World');
  });
  it('should render the {fallback} when the flag {name} don\' exists', async () => {
    mockFetchWithJsonValue(flags);
    render(
      <FireFlags projectId="test">
        <Feature name="test-feature-don't exists" fallback={<span>Not Hello World</span>}>
          Hello World
        </Feature>
      </FireFlags>
    );
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const element = await waitFor(() => screen.findByText('Not Hello World'));
    expect(element).toHaveTextContent('Not Hello World');
  });
  it('should not render the {children} when the flag {name} is not active', async () => {
    mockFetchWithJsonValue(flags);
    render(
      <FireFlags projectId="test">
        <Feature name="test-feature-not-active" fallback={<span>Not Hello World</span>}>
          Hello World
        </Feature>
      </FireFlags>
    );
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    await waitFor(() => screen.findByText('Not Hello World'));
    try {
      await screen.findByText('Hello World');
      fail();
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });
  it('should not render the {children} when the flag {name} don\'t exists', async () => {
    mockFetchWithJsonValue(flags);
    render(
      <FireFlags projectId="test">
        <Feature name="test-feature-not-exists" fallback={<span>Not Hello World</span>}>
          Hello World
        </Feature>
      </FireFlags>
    );
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    await waitFor(() => screen.findByText('Not Hello World'));
    try {
      await screen.findByText('Hello World');
      fail();
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });
});
