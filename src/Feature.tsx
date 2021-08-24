import React from 'react';
import useFeature from './use-feature';

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
 *   <Feature name="fluffy-wolfy">
 *     <CoolFeature />
 *   </Feature>
 * </div>
 * ```
 */
const Feature: React.FunctionComponent<FeatureProps> = ({
  children,
  fallback = <></>,
  name,
}) => {
  const hasFeature = useFeature(name);
  if (hasFeature) return <>{children}</>;
  return <>{fallback}</>;
};

export default Feature;
