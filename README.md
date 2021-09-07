# react-fire-flags

![CI/CD](https://github.com/alfredosalzillo/react-fire-flags/workflows/CI/CD/badge.svg)
[![codecov](https://codecov.io/gh/alfredosalzillo/react-fire-flags/branch/master/graph/badge.svg)](https://codecov.io/gh/alfredosalzillo/react-fire-flags)
[![npm version](https://badge.fury.io/js/react-fire-flags.svg)](https://badge.fury.io/js/react-fire-flags)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A component library to use with the API provided by [stack-on-fire/fire-flags](https://github.com/stack-on-fire/fire-flags).

## Install

Using npm.

```shell
npm install react-fire-flags
```

Using yarn.

```shell
yarn add react-fire-flags
```

## Usage

Add the `FireFlags` provider to your app and use the hooks and components to show features when active.

```typescript jsx
import React from 'react';
import { FireFlags, Feature } from 'react-fire-flags';

export function App() {
  return (
    <FireFlags projectId="your-fire-flags-project-id">
      ...
      <Feature name="HELLO_WORLD">
        <p>
          Hello from react-fire-flags
        </p>
      </Feature>  
      ...
    </FireFlags>  
  )
}
```

## Api

### Components

#### FireFlags

The provider to configure the communication with the fire-flags server. Must be added at the root of the project before using any of the hooks or components.
Props:
- `projectId` required the id of the fire-flags project
- `url` optional the url of the fire-flags  backend, to pass if using a self-hosted version 
- `config` optional a map of heats configurations

Example:

```javascript
function App() {
  return (
    <FireFlags
       projectId={process.env.REACT_APP_FIRE_FLAGS_PROJECT_ID}
       url={process.env.REACT_APP_FIRE_FLAGS_URL}
       config={{
         role: 'user',
       }}
    >
      Hello World!
    </FireFlags>
  )
}
```

#### Feature

A guard that renders the `children` if the flag with `name` exists. 
The `fallback` is rendered otherwise.

Props:
- `name` require the name of the flag to check if it is active
- `fallback` the fallback component to render if the flag is not active

Example:

```typescript jsx
const CoolFeature = () => <p>Coll feature active</p>
const Home = () => (
<div>
   <Feature name="fluffy-wolfy">
     <CoolFeature />
   </Feature>
</div>
)
```

### Hooks

#### useFlags

Get the list of all flags.

#### useFlag

Find the flag with then name `name`.

#### useFeature

Check if the flag with `name` is active.

---

This is a community project feel free to contribute.
