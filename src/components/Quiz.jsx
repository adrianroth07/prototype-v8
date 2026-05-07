import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { ROUND1_QUESTIONS, ROUND2_QUESTIONS } from '../data/questions.js';
import { shouldEndRound1 } from '../logic/matching.js';

export default function Quiz({ round }) {
  const { t } = useLang();
  const { state, dispatch } = usePathFinder();
  const [showWhy, setShowWhy] = useState(false);

  const questions = round === 1 ? ROUND1_QUESTIONS : ROUND2_QUESTIONS;
  const currentIndex = round === 1 ? state.round1Index : state.round2Index;
  const answers = round === 1 ? state.round1Answers : state.round2Answers;
  const question = questions[currentIndex];

  if (!question) return null;

  const selected = answers[currentIndex] || [];

  function selectOption(optId) {
    const newSelected = question.multi
      ? selected.includes(optId)
        ? selected.filter(id => id !== optId)
        : [...selected, optId]
      : [optId];

    if (round === 1) {
      dispatch({ type: 'SET_R1_ANSWER', index: currentIndex, selected: newSelected });
    } else {
      dispatch({ type: 'SET_R2_ANSWER', index: currentIndex, selected: newSelected });
    }
  }

  function goNext() {
    if (selected.length === 0) return;
    setShowWhy(false);

    const nextIndex = currentIndex + 1;

    if (round === 1) {
      const allAnswers = Object.values({ ...state.round1Answers, [currentIndex]: selected });
      if (nextIndex >= 3 && shouldEndRound1(allAnswers)) {
        dispatch({ type: 'NAVIGATE', screen: SCREENS.ROUND2_INTRO });
        return;
      }
      if (nextIndex >= questions.length) {
        dispatch({ type: 'NAVIGATE', screen: SCREENS.ROUND2_INTRO });
        return;
      }
      dispatch({ type: 'SET_R1_INDEX', index: nextIndex });
    } else {
      if (nextIndex >= questions.length) {
        dispatch({ type: 'NAVIGATE', screen: SCREENS.BLOCKS });
        return;
      }
      dispatch({ type: 'SET_R2_INDEX', index: nextIndex });
    }
  }

  function goBack() {
    setShowWhy(false);
    if (currentIndex > 0) {
      if (round === 1) dispatch({ type: 'SET_R1_INDEX', index: currentIndex - 1 });
      else dispatch({ type: 'SET_R2_INDEX', index: currentIndex - 1 });
    } else {
      if (round === 1) dispatch({ type: 'NAVIGATE', screen: SCREENS.OPENER });
      else dispatch({ type: 'NAVIGATE', screen: SCREENS.SAVICKAS });
    }
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const titleKey = round === 1 ? 'round1Title' : 'round2Title';
  const subtitleKey = round === 1 ? 'round1Subtitle' : 'round2Subtitle';

  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      <div className="bg-pf-primary text-white p-8 md:p-12 md:w-[360px] flex flex-col justify-between">
        <div>
          <button onClick={goBack} className="text-pf-mid hover:text-white text-sm mb-8 cursor-pointer">
            {t.quiz.back}
          </button>
          <h2 className="text-xl font-bold mb-2">{t.quiz[titleKey]}</h2>
          <p className="text-pf-mid text-sm">{t.quiz[subtitleKey]}</p>
        </div>
        <div className="mt-8">
          <div className="flex justify-between text-xs text-pf-mid mb-1">
            <span>{t.quiz.questionOf.replace('{current}', currentIndex + 1).replace('{total}', questions.length)}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-pf-dark rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 md:p-12 flex flex-col">
        <div className="text-xs font-bold text-pf-primary uppercase tracking-wider mb-2">
          {question.word}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {question.text}
        </h3>
        <p className="text-sm text-gray-500 mb-6">{question.hint}</p>

        <div className="flex flex-col gap-2 mb-6">
          {question.options.map((opt) => {
            const isSelected = selected.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => selectOption(opt.id)}
                className={`text-left p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-pf-primary bg-pf-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-sm text-gray-700">{opt.text}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowWhy(!showWhy)}
          className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer mb-4 self-start"
        >
          {t.quiz.whyWeAsk}
        </button>
        {showWhy && (
          <p className="text-xs text-gray-500 bg-surface rounded-lg p-3 mb-4">
            {question.why}
          </p>
        )}

        <div className="mt-auto">
          <button
            onClick={goNext}
            disabled={selected.length === 0}
            className="px-8 py-3 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t.quiz.next}
          </button>
        </div>
      </div>
    </div>
  );
}
