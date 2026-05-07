import { useState, useEffect } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { ROUND1_QUESTIONS, ROUND2_QUESTIONS } from '../data/questions.js';
import { shouldEndRound1 } from '../logic/matching.js';

export default function Quiz({ round }) {
  const { t } = useLang();
  const { state, dispatch } = usePathFinder();
  const [showWhy, setShowWhy] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const questions = round === 1 ? ROUND1_QUESTIONS : ROUND2_QUESTIONS;
  const currentIndex = round === 1 ? state.round1Index : state.round2Index;
  const answers = round === 1 ? state.round1Answers : state.round2Answers;
  const question = questions[currentIndex];

  useEffect(() => {
    setAnimKey(k => k + 1);
    setShowWhy(false);
  }, [currentIndex, round]);

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
      {/* Desktop sidebar */}
      <div className="hidden md:flex bg-gradient-to-b from-pf-primary to-pf-dark text-white p-12 md:w-[380px] flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border-2 border-white" />
        </div>
        <div className="relative">
          <button onClick={goBack} className="inline-flex items-center gap-1.5 text-pf-mid hover:text-white text-sm mb-10 cursor-pointer transition-colors">
            {'\u{2190}'} {t.quiz.back}
          </button>
          <h2 className="font-heading text-xl font-bold mb-2">{t.quiz[titleKey]}</h2>
          <p className="text-pf-mid text-sm leading-relaxed">{t.quiz[subtitleKey]}</p>
        </div>
        <div className="relative mt-8">
          <div className="flex justify-between text-xs text-pf-mid mb-2">
            <span>{t.quiz.questionOf.replace('{current}', currentIndex + 1).replace('{total}', questions.length)}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-pf-dark rounded-full overflow-hidden">
            <div className="progress-bar-fill h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-pf-primary text-white sticky top-0 z-10">
        <button onClick={goBack} className="text-white/70 hover:text-white cursor-pointer transition-colors p-1">
          {'\u{2190}'}
        </button>
        <span className="text-xs font-semibold text-white/80">
          {t.quiz.questionOf.replace('{current}', currentIndex + 1).replace('{total}', questions.length)}
        </span>
        <div className="flex-1 h-1.5 bg-pf-dark/50 rounded-full overflow-hidden">
          <div className="progress-bar-fill h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div key={animKey} className="flex-1 p-6 md:p-12 flex flex-col max-w-2xl">
        <div className="animate-fade-in-up">
          <div className="inline-block px-3 py-1 rounded-full bg-pf-light text-pf-primary text-xs font-bold uppercase tracking-wider mb-4">
            {question.word}
          </div>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-gray-800 mb-2 tracking-tight">
            {question.text}
          </h3>
          <p className="text-sm text-gray-400 mb-8">{question.hint}</p>
        </div>

        <div className="flex flex-col gap-2.5 mb-6">
          {question.options.map((opt, i) => {
            const isSelected = selected.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => selectOption(opt.id)}
                className={`animate-fade-in-up stagger-${Math.min(i + 1, 7)} option-card ${isSelected ? 'selected' : ''} text-left p-4 pl-5 rounded-xl border-2 cursor-pointer ${
                  isSelected
                    ? 'border-pf-primary bg-pf-light shadow-sm shadow-pf-primary/10'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected ? 'border-pf-primary bg-pf-primary' : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-base leading-relaxed ${isSelected ? 'text-pf-text font-medium' : 'text-gray-600'}`}>
                    {opt.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowWhy(!showWhy)}
          className="text-xs text-gray-400 hover:text-pf-primary cursor-pointer mb-4 self-start transition-colors"
        >
          {showWhy ? '\u{25B2}' : '\u{25BC}'} {t.quiz.whyWeAsk}
        </button>
        {showWhy && (
          <div className="animate-fade-in text-xs text-gray-500 bg-white rounded-xl p-4 mb-4 border border-gray-100 leading-relaxed shadow-sm">
            {question.why}
          </div>
        )}

        {/* Sticky CTA on mobile */}
        <div className="mt-auto pt-4 md:relative fixed bottom-0 left-0 right-0 md:p-0 p-4 bg-warm-50/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none z-10">
          <button
            onClick={goNext}
            disabled={selected.length === 0}
            className="btn-primary w-full md:w-auto px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none transition-all"
          >
            {t.quiz.next}
          </button>
        </div>
        {/* Spacer for fixed bottom CTA on mobile */}
        <div className="h-20 md:hidden" />
      </div>
    </div>
  );
}
