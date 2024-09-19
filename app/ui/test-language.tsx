import { useState } from 'react';
import { fetchTranslation } from '@/app/lib/data';

export default function TranslationComponent() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [srcLang, setSrcLang] = useState('en');
  const [tgtLang, setTgtLang] = useState('fr');

  const handleTranslate = async () => {
    const res = await fetchTranslation(text, srcLang, tgtLang);
    const data = await res.json();
    setTranslatedText(data.translatedText);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select value={srcLang} onChange={(e) => setSrcLang(e.target.value)}>
        <option value="en">English</option>
        <option value="fr">French</option>
        {/* Add more languages */}
      </select>
      <select value={tgtLang} onChange={(e) => setTgtLang(e.target.value)}>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        {/* Add more languages */}
      </select>
      <button onClick={handleTranslate}>Translate</button>
      <p>Translated Text: {translatedText}</p>
    </div>
  );
}