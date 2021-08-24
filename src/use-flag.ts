import useFlags from './use-flags';

/**
 * Find the flag with then name `name`.
 */
const useFlag = (name: string) => useFlags().find((flag) => flag.name === name);

export default useFlag;
