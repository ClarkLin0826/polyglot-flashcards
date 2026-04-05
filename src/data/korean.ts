export type HangulCharacter = {
  char: string;
  romaja: string;
  type: 'consonant' | 'double_consonant' | 'vowel' | 'complex_vowel';
};

export const hangul: HangulCharacter[] = [
  // Consonants (14)
  { char: 'ㄱ', romaja: 'g/k', type: 'consonant' },
  { char: 'ㄴ', romaja: 'n', type: 'consonant' },
  { char: 'ㄷ', romaja: 'd/t', type: 'consonant' },
  { char: 'ㄹ', romaja: 'r/l', type: 'consonant' },
  { char: 'ㅁ', romaja: 'm', type: 'consonant' },
  { char: 'ㅂ', romaja: 'b/p', type: 'consonant' },
  { char: 'ㅅ', romaja: 's', type: 'consonant' },
  { char: 'ㅇ', romaja: 'ng', type: 'consonant' },
  { char: 'ㅈ', romaja: 'j', type: 'consonant' },
  { char: 'ㅊ', romaja: 'ch', type: 'consonant' },
  { char: 'ㅋ', romaja: 'k', type: 'consonant' },
  { char: 'ㅌ', romaja: 't', type: 'consonant' },
  { char: 'ㅍ', romaja: 'p', type: 'consonant' },
  { char: 'ㅎ', romaja: 'h', type: 'consonant' },
  
  // Double Consonants (5)
  { char: 'ㄲ', romaja: 'kk', type: 'double_consonant' },
  { char: 'ㄸ', romaja: 'tt', type: 'double_consonant' },
  { char: 'ㅃ', romaja: 'pp', type: 'double_consonant' },
  { char: 'ㅆ', romaja: 'ss', type: 'double_consonant' },
  { char: 'ㅉ', romaja: 'jj', type: 'double_consonant' },

  // Basic Vowels (10)
  { char: 'ㅏ', romaja: 'a', type: 'vowel' },
  { char: 'ㅑ', romaja: 'ya', type: 'vowel' },
  { char: 'ㅓ', romaja: 'eo', type: 'vowel' },
  { char: 'ㅕ', romaja: 'yeo', type: 'vowel' },
  { char: 'ㅗ', romaja: 'o', type: 'vowel' },
  { char: 'ㅛ', romaja: 'yo', type: 'vowel' },
  { char: 'ㅜ', romaja: 'u', type: 'vowel' },
  { char: 'ㅠ', romaja: 'yu', type: 'vowel' },
  { char: 'ㅡ', romaja: 'eu', type: 'vowel' },
  { char: 'ㅣ', romaja: 'i', type: 'vowel' },

  // Complex Vowels (11)
  { char: 'ㅐ', romaja: 'ae', type: 'complex_vowel' },
  { char: 'ㅒ', romaja: 'yae', type: 'complex_vowel' },
  { char: 'ㅔ', romaja: 'e', type: 'complex_vowel' },
  { char: 'ㅖ', romaja: 'ye', type: 'complex_vowel' },
  { char: 'ㅘ', romaja: 'wa', type: 'complex_vowel' },
  { char: 'ㅙ', romaja: 'wae', type: 'complex_vowel' },
  { char: 'ㅚ', romaja: 'oe', type: 'complex_vowel' },
  { char: 'ㅝ', romaja: 'wo', type: 'complex_vowel' },
  { char: 'ㅞ', romaja: 'we', type: 'complex_vowel' },
  { char: 'ㅟ', romaja: 'wi', type: 'complex_vowel' },
  { char: 'ㅢ', romaja: 'ui', type: 'complex_vowel' }
];

export const koreanSyllables: { char: string; romaja: string }[] = [];
const initialConsonantsRomaja = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
const vowelsRomaja = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];

for (let i = 0; i < 19; i++) {
  for (let v = 0; v < 21; v++) {
    const charCode = 44032 + (i * 588) + (v * 28);
    koreanSyllables.push({
      char: String.fromCharCode(charCode),
      romaja: initialConsonantsRomaja[i] + vowelsRomaja[v]
    });
  }
}
