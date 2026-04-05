export type Character = {
  char: string;
  romaji: string;
  origin?: string;
  type?: string;
};

export const hiragana: Character[] = [
  { char: 'あ', romaji: 'a', origin: '安' }, { char: 'い', romaji: 'i', origin: '以' }, { char: 'う', romaji: 'u', origin: '宇' }, { char: 'え', romaji: 'e', origin: '衣' }, { char: 'お', romaji: 'o', origin: '於' },
  { char: 'か', romaji: 'ka', origin: '加' }, { char: 'き', romaji: 'ki', origin: '幾' }, { char: 'く', romaji: 'ku', origin: '久' }, { char: 'け', romaji: 'ke', origin: '計' }, { char: 'こ', romaji: 'ko', origin: '己' },
  { char: 'さ', romaji: 'sa', origin: '左' }, { char: 'し', romaji: 'shi', origin: '之' }, { char: 'す', romaji: 'su', origin: '寸' }, { char: 'せ', romaji: 'se', origin: '世' }, { char: 'そ', romaji: 'so', origin: '曾' },
  { char: 'た', romaji: 'ta', origin: '太' }, { char: 'ち', romaji: 'chi', origin: '知' }, { char: 'つ', romaji: 'tsu', origin: '川' }, { char: 'て', romaji: 'te', origin: '天' }, { char: 'と', romaji: 'to', origin: '止' },
  { char: 'な', romaji: 'na', origin: '奈' }, { char: 'に', romaji: 'ni', origin: '仁' }, { char: 'ぬ', romaji: 'nu', origin: '奴' }, { char: 'ね', romaji: 'ne', origin: '祢' }, { char: 'の', romaji: 'no', origin: '乃' },
  { char: 'は', romaji: 'ha', origin: '波' }, { char: 'ひ', romaji: 'hi', origin: '比' }, { char: 'ふ', romaji: 'fu', origin: '不' }, { char: 'へ', romaji: 'he', origin: '部' }, { char: 'ほ', romaji: 'ho', origin: '保' },
  { char: 'ま', romaji: 'ma', origin: '末' }, { char: 'み', romaji: 'mi', origin: '美' }, { char: 'む', romaji: 'mu', origin: '武' }, { char: 'め', romaji: 'me', origin: '女' }, { char: 'も', romaji: 'mo', origin: '毛' },
  { char: 'や', romaji: 'ya', origin: '也' }, { char: 'ゆ', romaji: 'yu', origin: '由' }, { char: 'よ', romaji: 'yo', origin: '与' },
  { char: 'ら', romaji: 'ra', origin: '良' }, { char: 'り', romaji: 'ri', origin: '利' }, { char: 'る', romaji: 'ru', origin: '留' }, { char: 'れ', romaji: 're', origin: '礼' }, { char: 'ろ', romaji: 'ro', origin: '呂' },
  { char: 'わ', romaji: 'wa', origin: '和' }, { char: 'を', romaji: 'wo', origin: '遠' }, { char: 'ん', romaji: 'n', origin: '无' }
];

export const katakana: Character[] = [
  { char: 'ア', romaji: 'a', origin: '阿' }, { char: 'イ', romaji: 'i', origin: '伊' }, { char: 'ウ', romaji: 'u', origin: '宇' }, { char: 'エ', romaji: 'e', origin: '江' }, { char: 'オ', romaji: 'o', origin: '於' },
  { char: 'カ', romaji: 'ka', origin: '加' }, { char: 'キ', romaji: 'ki', origin: '幾' }, { char: 'ク', romaji: 'ku', origin: '久' }, { char: 'ケ', romaji: 'ke', origin: '介' }, { char: 'コ', romaji: 'ko', origin: '己' },
  { char: 'サ', romaji: 'sa', origin: '散' }, { char: 'シ', romaji: 'shi', origin: '之' }, { char: 'ス', romaji: 'su', origin: '須' }, { char: 'セ', romaji: 'se', origin: '世' }, { char: 'ソ', romaji: 'so', origin: '曾' },
  { char: 'タ', romaji: 'ta', origin: '多' }, { char: 'チ', romaji: 'chi', origin: '千' }, { char: 'ツ', romaji: 'tsu', origin: '川' }, { char: 'テ', romaji: 'te', origin: '天' }, { char: 'ト', romaji: 'to', origin: '止' },
  { char: 'ナ', romaji: 'na', origin: '奈' }, { char: 'ニ', romaji: 'ni', origin: '二' }, { char: 'ヌ', romaji: 'nu', origin: '奴' }, { char: 'ネ', romaji: 'ne', origin: '祢' }, { char: 'ノ', romaji: 'no', origin: '乃' },
  { char: 'ハ', romaji: 'ha', origin: '八' }, { char: 'ヒ', romaji: 'hi', origin: '比' }, { char: 'フ', romaji: 'fu', origin: '不' }, { char: 'ヘ', romaji: 'he', origin: '部' }, { char: 'ホ', romaji: 'ho', origin: '保' },
  { char: 'マ', romaji: 'ma', origin: '万' }, { char: 'ミ', romaji: 'mi', origin: '三' }, { char: 'ム', romaji: 'mu', origin: '牟' }, { char: 'メ', romaji: 'me', origin: '女' }, { char: 'モ', romaji: 'mo', origin: '毛' },
  { char: 'ヤ', romaji: 'ya', origin: '也' }, { char: 'ユ', romaji: 'yu', origin: '由' }, { char: 'ヨ', romaji: 'yo', origin: '與' },
  { char: 'ラ', romaji: 'ra', origin: '良' }, { char: 'リ', romaji: 'ri', origin: '利' }, { char: 'ル', romaji: 'ru', origin: '流' }, { char: 'レ', romaji: 're', origin: '礼' }, { char: 'ロ', romaji: 'ro', origin: '呂' },
  { char: 'ワ', romaji: 'wa', origin: '和' }, { char: 'ヲ', romaji: 'wo', origin: '乎' }, { char: 'ン', romaji: 'n', origin: '尔' }
];
