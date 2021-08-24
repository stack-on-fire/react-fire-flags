import React, { useContext, useEffect, useState } from 'react';

export type Flag = {
  id: string,
  projectId: string,
  name: string,
  description?: string,
  isActive: boolean,
  isArchived: boolean,
  createdAt: string,
  updatedAt: string,
};

const FlagsContext = React.createContext<Flag[]>([]);

/**
 * Get the list of all flags.
 */
export const useFlags = (): Flag[] => useContext(FlagsContext);
/**
 * Find the flag with then name `name`.
 */
export const useFlag = (name: string) => useFlags().find((flag) => flag.name === name);
/**
 * Check if the flag with `name` is active.
 */
export const useFeature = (name: string) => useFlags()
  .some((flag) => (flag.name === name && flag.isActive));

export type FeatureProps = React.PropsWithChildren<{
  /**
   * The name of the flag to check if is active.
   */
  name: string,
  /**
   * The fallback component to show if the feature don't exists.
   */
  fallback?: React.ReactNode,
}>;
/**
 * A guard that render the `children` if the flag with `name` exists.
 * The `fallback` is rendered otherwise.
 *
 * @example
 * ```javascript
 * const CoolFeature = () => <p>Coll feature active</p>
 * const Home = () => (
 * <div>
 *   <Feature>
 *     <CoolFeature />
 *   </Feature>
 * </div>
 * ```
 */
export const Feature: React.FunctionComponent<FeatureProps> = ({
  children,
  fallback = <></>,
  name,
}) => {
  const hasFeature = useFeature(name);
  if (hasFeature) return <>{children}</>;
  return <>{fallback}</>;
};

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
const defaultUrl = 'https://flags.stackonfire.dev';
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
export const FireFlags: React.FunctionComponent<FireFlagsProps> = ({
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
