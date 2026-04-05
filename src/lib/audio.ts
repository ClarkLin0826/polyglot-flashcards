export const playAudio = (text: string, languageCode: 'ja-JP' | 'ko-KR' | 'th-TH' | 'vi-VN') => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageCode;
    utterance.rate = 0.85; // Slightly slower for language learners
    
    window.speechSynthesis.speak(utterance);
  }
};
