import { computeRiasec, countUnsure, extractLifestyle, suggestPaths, getWildcards, buildReasons, filterByQuals } from '../logic/matching.js';

export const SCREENS = {
  WELCOME: 'WELCOME',
  OPENER: 'OPENER',
  QUIZ_R1: 'QUIZ_R1',
  ROUND2_INTRO: 'ROUND2_INTRO',
  SAVICKAS: 'SAVICKAS',
  QUIZ_R2: 'QUIZ_R2',
  BLOCKS: 'BLOCKS',
  SUCCESS_PICTURE: 'SUCCESS_PICTURE',
  PATHS: 'PATHS',
  QUALIFICATIONS: 'QUALIFICATIONS',
  FIELD_NARROWING: 'FIELD_NARROWING',
  COMPARISON: 'COMPARISON',
  STORIES: 'STORIES',
  BROWSE: 'BROWSE',
  MAP: 'MAP',
  PATH_BUILDER: 'PATH_BUILDER',
};

export function freshState() {
  return {
    screen: SCREENS.WELCOME,
    userMode: null,
    round1Answers: {},
    round2Answers: {},
    round1Index: 0,
    round2Index: 0,
    round1Length: 10,
    unsureCount: 0,
    savickasAnswers: { roleModel: '', story: '', motto: '' },
    blocks: [],
    blocksOther: '',
    successPicture: '',
    riasecCounts: {},
    lifestyle: {},
    suggestedPaths: [],
    wildcardPaths: [],
    reasons: {},
    quals: { cert: null, overallGrade: '', langs: [], engLevel: '', experience: [], extras: [] },
    filterResult: {},
    selectedClusters: [],
  };
}

export function appReducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, screen: action.screen };

    case 'SET_USER_MODE':
      return { ...state, userMode: action.mode };

    case 'SET_R1_ANSWER':
      return {
        ...state,
        round1Answers: { ...state.round1Answers, [action.index]: action.selected },
      };

    case 'SET_R1_INDEX':
      return { ...state, round1Index: action.index };

    case 'SET_R2_ANSWER':
      return {
        ...state,
        round2Answers: { ...state.round2Answers, [action.index]: action.selected },
      };

    case 'SET_R2_INDEX':
      return { ...state, round2Index: action.index };

    case 'SET_SAVICKAS':
      return { ...state, savickasAnswers: action.answers };

    case 'SET_BLOCKS':
      return { ...state, blocks: action.blocks, blocksOther: action.other ?? state.blocksOther };

    case 'SET_SUCCESS_PICTURE':
      return { ...state, successPicture: action.text };

    case 'COMPUTE_RESULTS': {
      const riasecCounts = computeRiasec(state.round1Answers);
      const unsureCount = countUnsure(state.round1Answers);
      const lifestyle = extractLifestyle(state.round2Answers);

      let userMode = state.userMode;
      if (unsureCount >= 3 && userMode !== 'clear') userMode = 'lena';

      const suggested = suggestPaths(riasecCounts, lifestyle);
      const wcCount = userMode === 'lena' ? 2 : userMode === null ? 1 : 0;
      const wildcardPaths = getWildcards(riasecCounts, suggested, lifestyle?.anchor, wcCount);
      const allPaths = [...suggested, ...wildcardPaths];
      const reasons = buildReasons(allPaths, riasecCounts, lifestyle);

      return {
        ...state,
        riasecCounts,
        unsureCount,
        lifestyle,
        userMode,
        suggestedPaths: suggested,
        wildcardPaths,
        reasons,
      };
    }

    case 'SWAP_PATH': {
      const { removeId, addPath } = action;
      const suggestedPaths = state.suggestedPaths.map(p =>
        p.id === removeId ? addPath : p
      );
      const wildcardPaths = state.wildcardPaths.filter(p => p.id !== addPath.id);
      const removed = state.suggestedPaths.find(p => p.id === removeId);
      if (removed) wildcardPaths.push(removed);
      const allPaths = [...suggestedPaths, ...wildcardPaths];
      const reasons = buildReasons(allPaths, state.riasecCounts, state.lifestyle);
      return { ...state, suggestedPaths, wildcardPaths, reasons };
    }

    case 'SET_QUALS': {
      const quals = action.quals;
      const allPaths = [...state.suggestedPaths, ...state.wildcardPaths];
      const filterResult = filterByQuals(allPaths, quals);
      return { ...state, quals, filterResult };
    }

    case 'SET_CLUSTERS':
      return { ...state, selectedClusters: action.clusters };

    case 'RESTART':
      return freshState();

    default:
      return state;
  }
}
