import useFlags from './use-flags';

/**
 * Check if the flag with `name` is active.
 */
const useFeature = (name: string) => useFlags()
  .some((flag) => (flag.name === name && flag.isActive));

export default useFeature;
