import { createContext, useContext, useReducer, useEffect } from 'react';
import { appReducer, freshState, SCREENS } from './appReducer.js';

const PathFinderContext = createContext();
const STORAGE_KEY = 'pathfinder-v5';
const STATE_VERSION = 1;

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { _v, ...state } = JSON.parse(raw);
    if (_v !== STATE_VERSION || typeof state.screen !== 'string') return null;
    return state;
  } catch {
    return null;
  }
}

function initState() {
  const saved = loadSavedState();
  return saved ? { ...freshState(), ...saved } : freshState();
}

export function PathFinderProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, null, initState);

  useEffect(() => {
    try {
      if (state.screen === SCREENS.WELCOME && !state.userMode) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ _v: STATE_VERSION, ...state }));
      }
    } catch { /* storage unavailable */ }
  }, [state]);

  return (
    <PathFinderContext.Provider value={{ state, dispatch }}>
      {children}
    </PathFinderContext.Provider>
  );
}

export function usePathFinder() {
  return useContext(PathFinderContext);
}
