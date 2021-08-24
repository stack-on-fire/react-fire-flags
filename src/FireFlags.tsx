import React, { useEffect, useState } from 'react';
import FlagsContext from './context';
import type { Flag } from './types';

const defaultUrl = 'https://flags.stackonfire.dev';
export type FireFlagsProps = React.PropsWithChildren<{
  /**
   * The id of the [fire-flags](https://flags.stackonfire.dev') project
   */
  projectId: string,
  /**
   * The url of the [fire-flags](https://flags.stackonfire.dev') backend, to pass if using a
   * self-hosted version
   */
  url?: string,
}>;
/**
 * The provider to configure of the fire-flags server.
 * Must be added to the root of the project before using any of the hooks or components.
 *
 * @example
 * ```javascript
 * function App() {
 *   return (
 *     <FireFlags
 *        projectId={process.env.REACT_APP_FIRE_FLAGS_PROJECT_ID}
 *        url={process.env.REACT_APP_FIRE_FLAGS_URL}
 *     >
 *       Hello World!
 *     </FireFlags>
 *   )
 * }
 * ```
 */
const FireFlags: React.FunctionComponent<FireFlagsProps> = ({
  children,
  projectId,
  url = defaultUrl,
}) => {
  if (projectId === undefined) {
    throw new Error('FlagsProvider expects project id');
  }
  const [data, setData] = useState<Flag[]>([]);
  useEffect(() => {
    fetch(`${url}/api/flags/${projectId}`)
      .then((res) => res.json())
      .then(setData);
  }, [projectId, url]);
  return (
    <FlagsContext.Provider value={data}>
      {children}
    </FlagsContext.Provider>
  );
};

export default FireFlags;

