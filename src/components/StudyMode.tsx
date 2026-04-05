import { Language, JpScript } from '../App';
import { hiragana, katakana } from '../data/japanese';
import { thaiConsonants, thaiVowels } from '../data/thai';
import { vietnameseAlphabet } from '../data/vietnamese';
import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';
import { playAudio } from '../lib/audio';

interface StudyModeProps {
  language: Language;
  jpScript: JpScript;
}

export default function StudyMode({ language, jpScript }: StudyModeProps) {
  const handlePlay = (char: string) => {
    let langCode = 'ja-JP';
    if (language === 'korean') langCode = 'ko-KR';
    if (language === 'thai') langCode = 'th-TH';
    if (language === 'vietnamese') langCode = 'vi-VN';
    playAudio(char, langCode);
  };

  if (language === 'japanese') {
    const data = jpScript === 'hiragana' ? hiragana : katakana;
    
    return (
      <div className="p-4 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-neutral-800 capitalize">{jpScript} Chart</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {data.map((item, index) => (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.01 }}
              key={item.char}
              onClick={() => handlePlay(item.char)}
              className="relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-neutral-100 bg-neutral-50 hover:bg-indigo-50 hover:border-indigo-100 transition-colors cursor-pointer group"
              title="Click to hear pronunciation"
            >
              <Volume2 className="absolute top-2 right-2 w-4 h-4 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-baseline gap-1 sm:gap-2 mb-1 sm:mb-2">
                {item.origin && <span className="text-lg sm:text-xl text-neutral-400 font-serif">{item.origin}</span>}
                <span className="text-2xl sm:text-3xl font-medium text-neutral-900 group-hover:text-indigo-600 transition-colors">{item.char}</span>
              </div>
              <span className="text-xs sm:text-sm text-neutral-500 font-mono text-center">{item.romaji}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Korean Hangul Combination Table
  const koreanConsonants = [
    { char: 'ㄱ', index: 0 }, { char: 'ㄴ', index: 2 }, { char: 'ㄷ', index: 3 },
    { char: 'ㄹ', index: 5 }, { char: 'ㅁ', index: 6 }, { char: 'ㅂ', index: 7 },
    { char: 'ㅅ', index: 9 }, { char: 'ㅇ', index: 11 }, { char: 'ㅈ', index: 12 },
    { char: 'ㅊ', index: 14 }, { char: 'ㅋ', index: 15 }, { char: 'ㅌ', index: 16 },
    { char: 'ㅍ', index: 17 }, { char: 'ㅎ', index: 18 }
  ];

  const koreanDoubleConsonants = [
    { char: 'ㄲ', index: 1 }, { char: 'ㄸ', index: 4 }, { char: 'ㅃ', index: 8 },
    { char: 'ㅆ', index: 10 }, { char: 'ㅉ', index: 13 }
  ];

  const koreanVowels = [
    { char: 'ㅏ', index: 0 }, { char: 'ㅑ', index: 2 }, { char: 'ㅓ', index: 4 },
    { char: 'ㅕ', index: 6 }, { char: 'ㅗ', index: 8 }, { char: 'ㅛ', index: 12 },
    { char: 'ㅜ', index: 13 }, { char: 'ㅠ', index: 17 }, { char: 'ㅡ', index: 18 },
    { char: 'ㅣ', index: 20 }, { char: 'ㅐ', index: 1 }, { char: 'ㅒ', index: 3 },
    { char: 'ㅔ', index: 5 }, { char: 'ㅖ', index: 7 }, { char: 'ㅘ', index: 9 },
    { char: 'ㅙ', index: 10 }, { char: 'ㅚ', index: 11 }, { char: 'ㅝ', index: 14 },
    { char: 'ㅞ', index: 15 }, { char: 'ㅟ', index: 16 }, { char: 'ㅢ', index: 19 }
  ];

  const getSyllable = (initial: number, medial: number) => {
    return String.fromCharCode(44032 + (initial * 588) + (medial * 28));
  };

  const renderKoreanTable = (consonantsList: typeof koreanConsonants) => (
    <div className="overflow-x-auto mb-8 pb-4">
      <table className="w-full border-collapse border-2 border-purple-800 text-center bg-white shadow-sm">
        <thead>
          <tr>
            <th className="border border-purple-200 bg-purple-50 p-2 text-purple-900 font-bold min-w-[2.5rem]"></th>
            {koreanVowels.map(v => (
              <th key={v.char} className="border border-purple-200 bg-purple-50 p-2 text-purple-900 font-bold min-w-[2.5rem]">
                {v.char}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {consonantsList.map(c => (
            <tr key={c.char} className="hover:bg-purple-50/50 transition-colors">
              <th className="border border-purple-200 bg-purple-50/30 p-2 text-purple-900 font-bold">
                {c.char}
              </th>
              {koreanVowels.map(v => {
                const syllable = getSyllable(c.index, v.index);
                return (
                  <td key={syllable} className="border border-purple-200 p-0">
                    <button 
                      onClick={() => handlePlay(syllable)}
                      className="w-full h-full p-2 text-lg hover:bg-purple-100 hover:text-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-inset"
                      title="Click to hear pronunciation"
                    >
                      {syllable}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (language === 'thai') {
    return (
      <div className="p-4 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-neutral-800">Thai Consonants</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {thaiConsonants.map((item, index) => (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.01 }}
              key={item.char}
              onClick={() => handlePlay(item.char)}
              className="relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-neutral-100 bg-neutral-50 hover:bg-orange-50 hover:border-orange-100 transition-colors cursor-pointer group"
              title="Click to hear pronunciation"
            >
              <Volume2 className="absolute top-2 right-2 w-4 h-4 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-2xl sm:text-3xl font-medium text-neutral-900 mb-1 sm:mb-2 group-hover:text-orange-600 transition-colors">{item.char}</span>
              <span className="text-xs sm:text-sm text-neutral-500 font-mono text-center">{item.romanization}</span>
              <span className="text-[10px] sm:text-xs text-neutral-400 mt-1 font-medium text-center">{item.meaning}</span>
            </motion.button>
          ))}
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-neutral-800">Thai Vowels</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          {thaiVowels.map((item, index) => (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.01 }}
              key={item.char}
              onClick={() => handlePlay(item.char)}
              className="relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-neutral-100 bg-neutral-50 hover:bg-orange-50 hover:border-orange-100 transition-colors cursor-pointer group"
              title="Click to hear pronunciation"
            >
              <Volume2 className="absolute top-2 right-2 w-4 h-4 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-2xl sm:text-3xl font-medium text-neutral-900 mb-1 sm:mb-2 group-hover:text-orange-600 transition-colors">{item.char}</span>
              <span className="text-xs sm:text-sm text-neutral-500 font-mono text-center">{item.romanization}</span>
              <span className="text-[10px] sm:text-xs text-neutral-400 mt-1 font-medium text-center">{item.meaning}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  if (language === 'vietnamese') {
    return (
      <div className="p-4 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-neutral-800">Vietnamese Alphabet</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {vietnameseAlphabet.map((item, index) => (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.01 }}
              key={item.char}
              onClick={() => handlePlay(item.char)}
              className="relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-neutral-100 bg-neutral-50 hover:bg-green-50 hover:border-green-100 transition-colors cursor-pointer group"
              title="Click to hear pronunciation"
            >
              <Volume2 className="absolute top-2 right-2 w-4 h-4 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-2xl sm:text-3xl font-medium text-neutral-900 mb-1 sm:mb-2 group-hover:text-green-600 transition-colors">{item.char}</span>
              <span className="text-xs sm:text-sm text-neutral-500 font-mono text-center">{item.romanization}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-neutral-800">Hangul Combination Chart</h2>
      {renderKoreanTable(koreanConsonants)}
      {renderKoreanTable(koreanDoubleConsonants)}
    </div>
  );
}
