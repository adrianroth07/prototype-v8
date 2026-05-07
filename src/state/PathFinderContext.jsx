import { createContext, useContext, useReducer } from 'react';
import { appReducer, freshState } from './appReducer.js';

const PathFinderContext = createContext();

export function PathFinderProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, null, freshState);
  return (
    <PathFinderContext.Provider value={{ state, dispatch }}>
      {children}
    </PathFinderContext.Provider>
  );
}

export function usePathFinder() {
  return useContext(PathFinderContext);
}
