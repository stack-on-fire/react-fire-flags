import { useContext } from 'react';
import FlagsContext from './context';
import type { Flag } from './types';

/**
 * Get the list of all flags.
 */
const useFlags = (): Flag[] => useContext(FlagsContext);

export default useFlags;
