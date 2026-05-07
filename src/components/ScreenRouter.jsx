import { useEffect } from 'react';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import Welcome from './Welcome.jsx';
import Opener from './Opener.jsx';
import Quiz from './Quiz.jsx';
import Round2Intro from './Round2Intro.jsx';
import Savickas from './Savickas.jsx';
import Blocks from './Blocks.jsx';
import SuccessPicture from './SuccessPicture.jsx';
import Paths from './Paths.jsx';
import Qualifications from './Qualifications.jsx';
import FieldNarrowing from './FieldNarrowing.jsx';
import Comparison from './Comparison.jsx';
import Stories from './Stories.jsx';
import Browse from './Browse.jsx';
import PathMap from './PathMap.jsx';
import PathBuilder from './PathBuilder.jsx';

export default function ScreenRouter() {
  const { state } = usePathFinder();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.screen]);

  switch (state.screen) {
    case SCREENS.WELCOME:        return <Welcome />;
    case SCREENS.OPENER:         return <Opener />;
    case SCREENS.QUIZ_R1:        return <Quiz round={1} />;
    case SCREENS.ROUND2_INTRO:   return <Round2Intro />;
    case SCREENS.SAVICKAS:       return <Savickas />;
    case SCREENS.QUIZ_R2:        return <Quiz round={2} />;
    case SCREENS.BLOCKS:         return <Blocks />;
    case SCREENS.SUCCESS_PICTURE: return <SuccessPicture />;
    case SCREENS.PATHS:          return <Paths />;
    case SCREENS.QUALIFICATIONS: return <Qualifications />;
    case SCREENS.FIELD_NARROWING: return <FieldNarrowing />;
    case SCREENS.COMPARISON:     return <Comparison />;
    case SCREENS.STORIES:        return <Stories />;
    case SCREENS.BROWSE:         return <Browse />;
    case SCREENS.MAP:            return <PathMap />;
    case SCREENS.PATH_BUILDER:   return <PathBuilder />;
    default:                     return <Welcome />;
  }
}
