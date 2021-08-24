import React from 'react';
import type { Flag } from './types';

const FlagsContext = React.createContext<Flag[]>([]);

export default FlagsContext;
