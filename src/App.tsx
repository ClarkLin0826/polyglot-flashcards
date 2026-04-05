import { useState } from 'react';
import { Languages, BookOpen, BrainCircuit } from 'lucide-react';
import StudyMode from './components/StudyMode';
import QuizMode from './components/QuizMode';

export type Language = 'japanese' | 'korean' | 'thai' | 'vietnamese';
export type Mode = 'study' | 'quiz';
export type JpScript = 'hiragana' | 'katakana';

export default function App() {
  const [language, setLanguage] = useState<Language>('japanese');
  const [mode, setMode] = useState<Mode>('study');
  const [jpScript, setJpScript] = useState<JpScript>('hiragana');

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-indigo-100">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl tracking-tight">
            <Languages className="w-6 h-6" />
            <span>Polyglot Cards</span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center bg-neutral-100 p-1 rounded-lg gap-1">
            <button
              onClick={() => setLanguage('japanese')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                language === 'japanese' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Japanese
            </button>
            <button
              onClick={() => setLanguage('korean')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                language === 'korean' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Korean
            </button>
            <button
              onClick={() => setLanguage('thai')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                language === 'thai' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Thai
            </button>
            <button
              onClick={() => setLanguage('vietnamese')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                language === 'vietnamese' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Vietnamese
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center bg-white border border-neutral-200 p-1 rounded-xl shadow-sm">
            <button
              onClick={() => setMode('study')}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === 'study' ? 'bg-indigo-50 text-indigo-700' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Study
            </button>
            <button
              onClick={() => setMode('quiz')}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === 'quiz' ? 'bg-indigo-50 text-indigo-700' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              Quiz
            </button>
          </div>

          {language === 'japanese' && (
            <div className="flex items-center bg-white border border-neutral-200 p-1 rounded-xl shadow-sm">
              <button
                onClick={() => setJpScript('hiragana')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  jpScript === 'hiragana' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                Hiragana
              </button>
              <button
                onClick={() => setJpScript('katakana')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  jpScript === 'katakana' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                Katakana
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden min-h-[60vh]">
          {mode === 'study' ? (
            <StudyMode language={language} jpScript={jpScript} />
          ) : (
            <QuizMode language={language} jpScript={jpScript} />
          )}
        </div>
      </main>
    </div>
  );
}
