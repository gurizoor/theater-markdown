import { useRef, useEffect } from 'react';

export default function Editor({ value, onChange }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div className="editor-container">
      <textarea
        ref={textareaRef}
        className="editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="台本を入力してください..."
        spellCheck="false"
      />
    </div>
  );
}
