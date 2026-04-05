import { useState, useEffect, useMemo } from 'react';
import { Language, JpScript } from '../App';
import { hiragana, katakana } from '../data/japanese';
import { hangul, koreanSyllables } from '../data/korean';
import { thaiConsonants, thaiVowels } from '../data/thai';
import { vietnameseAlphabet } from '../data/vietnamese';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, RefreshCw, Volume2, Trophy, Settings2, BookX } from 'lucide-react';
import { playAudio } from '../lib/audio';
import confetti from 'canvas-confetti';

interface QuizModeProps {
  language: Language;
  jpScript: JpScript;
}

type Question = {
  char: string;
  answer: string;
  options: string[];
};

export default function QuizMode({ language, jpScript }: QuizModeProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [isReviewMode, setIsReviewMode] = useState(false);

  // Load best score and mistakes on mount
  useEffect(() => {
    const scoreKey = `bestScore_${language}_${jpScript}`;
    const savedScore = localStorage.getItem(scoreKey);
    if (savedScore) {
      setBestScore(parseInt(savedScore, 10));
    } else {
      setBestScore(0);
    }

    const mistakesKey = `mistakes_${language}_${jpScript}`;
    const savedMistakes = localStorage.getItem(mistakesKey);
    if (savedMistakes) {
      setMistakes(JSON.parse(savedMistakes));
    } else {
      setMistakes([]);
    }
  }, [language, jpScript]);

  const saveMistakes = (newMistakes: string[]) => {
    setMistakes(newMistakes);
    localStorage.setItem(`mistakes_${language}_${jpScript}`, JSON.stringify(newMistakes));
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStarted || isFinished || selectedAnswer !== null) return;
      
      const key = e.key;
      if (['1', '2', '3', '4'].includes(key)) {
        const index = parseInt(key) - 1;
        if (questions[currentIndex]?.options[index]) {
          handleAnswer(questions[currentIndex].options[index]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, isFinished, selectedAnswer, questions, currentIndex]);

  // Auto-play audio when question changes
  useEffect(() => {
    if (isStarted && !isFinished && autoPlay && questions[currentIndex]) {
      // Small delay to ensure the UI has updated before playing
      const timer = setTimeout(() => {
        let langCode = 'ja-JP';
        if (language === 'korean') langCode = 'ko-KR';
        if (language === 'thai') langCode = 'th-TH';
        if (language === 'vietnamese') langCode = 'vi-VN';
        playAudio(questions[currentIndex].char, langCode);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isStarted, isFinished, autoPlay, language, questions]);

  // Handle finish and confetti
  useEffect(() => {
    if (isFinished) {
      // Update best score
      const key = `bestScore_${language}_${jpScript}`;
      if (score > bestScore) {
        localStorage.setItem(key, score.toString());
        setBestScore(score);
      }

      // Confetti for perfect score
      if (score === 10) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4f46e5', '#10b981', '#f59e0b']
        });
      }
    }
  }, [isFinished, score, bestScore, language, jpScript]);

  // Generate questions when starting
  const generateQuestions = (review = false) => {
    let sourceData: any[] = [];
    
    if (language === 'japanese') {
      sourceData = jpScript === 'hiragana' ? hiragana : katakana;
    } else if (language === 'korean') {
      sourceData = koreanSyllables;
    } else if (language === 'thai') {
      sourceData = [...thaiConsonants, ...thaiVowels];
    } else if (language === 'vietnamese') {
      sourceData = vietnameseAlphabet;
    }

    let pool = sourceData;
    if (review) {
      pool = sourceData.filter(x => mistakes.includes(x.char));
    }

    // Shuffle and pick up to 10 questions
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(10, shuffled.length));

    const newQuestions: Question[] = selected.map(item => {
      const answer = item.romaji || item.romaja || item.romanization || '';
      
      // Get 3 random wrong answers from the FULL source data (not just mistakes)
      const wrongAnswers = sourceData
        .filter(x => (x.romaji || x.romaja || x.romanization) !== answer)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(x => x.romaji || x.romaja || x.romanization || '');

      const options = [answer, ...wrongAnswers].sort(() => 0.5 - Math.random());

      return {
        char: item.char,
        answer,
        options
      };
    });

    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
    setIsStarted(true);
    setIsReviewMode(review);
  };

  // Reset if language or script changes
  useEffect(() => {
    setIsStarted(false);
  }, [language, jpScript]);

  const handleAnswer = (option: string) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks
    
    setSelectedAnswer(option);
    
    const isCorrect = option === questions[currentIndex].answer;
    const currentChar = questions[currentIndex].char;

    if (isCorrect) {
      setScore(s => s + 1);
      if (isReviewMode) {
        // Remove from mistakes if answered correctly in review mode
        saveMistakes(mistakes.filter(m => m !== currentChar));
      }
    } else {
      // Add to mistakes if not already there
      if (!mistakes.includes(currentChar)) {
        saveMistakes([...mistakes, currentChar]);
      }
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 1000);
  };

  const handlePlay = (char: string) => {
    let langCode = 'ja-JP';
    if (language === 'korean') langCode = 'ko-KR';
    if (language === 'thai') langCode = 'th-TH';
    if (language === 'vietnamese') langCode = 'vi-VN';
    playAudio(char, langCode);
  };

  if (!isStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] p-8 text-center">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">
            {language === 'japanese' ? (jpScript === 'hiragana' ? 'あ' : 'ア') : 
             language === 'korean' ? '가' : 
             language === 'thai' ? 'ก' : 'A'}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Ready to test your memory?</h2>
        <p className="text-neutral-500 mb-8 max-w-md">
          You will be shown 10 random characters. Choose the correct pronunciation for each.
        </p>
        
        <div className="flex items-center gap-3 mb-8 bg-white border border-neutral-200 px-4 py-2 rounded-lg shadow-sm">
          <Settings2 className="w-4 h-4 text-neutral-400" />
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 cursor-pointer">
            <input 
              type="checkbox" 
              checked={autoPlay}
              onChange={(e) => setAutoPlay(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            Auto-play pronunciation
          </label>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => generateQuestions(false)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-sm"
          >
            Start Quiz
          </button>

          {mistakes.length > 0 && (
            <button
              onClick={() => generateQuestions(true)}
              className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-700 px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
            >
              <BookX className="w-5 h-5" />
              Review Mistakes ({mistakes.length})
            </button>
          )}
        </div>
        
        {bestScore > 0 && (
          <div className="mt-8 flex items-center gap-2 text-amber-600 font-medium bg-amber-50 px-4 py-2 rounded-full">
            <Trophy className="w-4 h-4" />
            <span>Best Score: {bestScore}/10</span>
          </div>
        )}
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6"
        >
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-green-600">{score}/10</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">Quiz Complete!</h2>
          <p className="text-neutral-500">
            {score === 10 ? 'Perfect score! Amazing job!' : 
             score >= 7 ? 'Great work! Keep practicing.' : 
             'Good effort! Study a bit more and try again.'}
          </p>
        </motion.div>
        
        <div className="flex gap-4">
          <button
            onClick={() => generateQuestions(false)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Play Again
          </button>

          {mistakes.length > 0 && (
            <button
              onClick={() => generateQuestions(true)}
              className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-700 px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
            >
              <BookX className="w-4 h-4" />
              Review Mistakes ({mistakes.length})
            </button>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2 text-amber-600 font-medium bg-amber-50 px-4 py-2 rounded-full">
          <Trophy className="w-4 h-4" />
          <span>Best Score: {Math.max(score, bestScore)}/10</span>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="flex flex-col h-full min-h-[60vh]">
      {/* Progress Bar */}
      <div className="h-1.5 bg-neutral-100 w-full">
        <motion.div 
          className="h-full bg-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-lg mx-auto w-full">
        <div className="text-sm font-medium text-neutral-400 mb-8 tracking-widest uppercase">
          Question {currentIndex + 1} of {questions.length}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col items-center"
          >
            {/* Character Card */}
            <button 
              onClick={() => handlePlay(currentQ.char)}
              className="relative w-48 h-48 bg-white border-2 border-neutral-100 rounded-3xl shadow-sm flex items-center justify-center mb-10 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors group cursor-pointer"
              title="Click to hear pronunciation"
            >
              <Volume2 className="absolute top-4 right-4 w-6 h-6 text-neutral-300 group-hover:text-indigo-400 transition-colors" />
              <span className="text-7xl font-medium text-neutral-900 group-hover:text-indigo-600 transition-colors">{currentQ.char}</span>
            </button>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {currentQ.options.map((option, i) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQ.answer;
                const showResult = selectedAnswer !== null;
                
                let btnClass = "relative p-4 rounded-xl border-2 text-lg font-medium transition-all ";
                
                if (!showResult) {
                  btnClass += "border-neutral-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 text-neutral-700";
                } else {
                  if (isCorrect) {
                    btnClass += "border-green-500 bg-green-50 text-green-700";
                  } else if (isSelected && !isCorrect) {
                    btnClass += "border-red-500 bg-red-50 text-red-700";
                  } else {
                    btnClass += "border-neutral-200 bg-white text-neutral-400 opacity-50";
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={btnClass}
                  >
                    <span className="absolute top-2 left-3 text-xs text-neutral-400 font-mono opacity-50">{i + 1}</span>
                    {option}
                    {showResult && isCorrect && (
                      <CheckCircle2 className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-green-500" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-red-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
