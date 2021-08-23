# react-fire-flags

A component library to use [stack-on-fire/fire-flags](https://github.com/stack-on-fire/fire-flags) apis.

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

The provider to configure of the fire-flags server. Must be added to the root of the project before using any of the hooks or components.
Props:
- `projectId` required the id of the fire-flags project
- `url` optional the url of the fire-flags  backend, to pass if using a self-hosted version 

Example:

```javascript
function App() {
  return (
    <FireFlags
       projectId={process.env.REACT_APP_FIRE_FLAGS_PROJECT_ID}
       url={process.env.REACT_APP_FIRE_FLAGS_URL}
    >
      Hello World!
    </FireFlags>
  )
}
```

#### Feature

A guard that render the `children` if the flag with `name` exists. 
The `fallback` is rendered otherwise.

Props:
- `name` require the name of the flag to check if is active
- `fallback` the fallback component to render if the flag is not active

Example:

```typescript jsx
const CoolFeature = () => <p>Coll feature active</p>
const Home = () => (
<div>
   <Feature>
     <CoolFeature />
   </Feature>
</div>
)
```

### Hooks

#### useFlags

Get the list of active flags.

#### useFlag

Find the flag with then name `name` if active.

#### useFeature

Check if the flag with `name` is active.

## Next Steps

- Add tests

---

This is a community project feel free to contribute.
