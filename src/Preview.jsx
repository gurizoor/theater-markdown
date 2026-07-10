export default function Preview({ parsedData }) {
  // キャラクターごとに色を生成
  const getCharacterColor = (character) => {
    let hash = 0;
    for (let i = 0; i < character.length; i++) {
      hash = character.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 85%)`;
  };

  const getCharacterBorderColor = (character) => {
    let hash = 0;
    for (let i = 0; i < character.length; i++) {
      hash = character.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 50%)`;
  };

  if (!parsedData || parsedData.scenes.length === 0) {
    return (
      <div className="preview-container">
        <div className="preview-empty">
          <p>プレビューが表示されます</p>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-container">
      {parsedData.scenes.map((scene, sceneIndex) => (
        <div key={sceneIndex} className="scene">
          <h2 className="scene-title">🎭 {scene.title}</h2>
          
          {scene.characters.length > 0 && (
            <div className="characters">
              <span className="characters-label">👤 登場人物:</span>
              {scene.characters.map((char, charIndex) => (
                <span 
                  key={charIndex} 
                  className="character-tag"
                  style={{ 
                    backgroundColor: getCharacterColor(char),
                    borderColor: getCharacterBorderColor(char)
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          )}

          {scene.actions.map((action, actionIndex) => (
            <div key={actionIndex} className="action">
              📝 <em>{action}</em>
            </div>
          ))}

          {scene.dialogues.map((dialogue, dialogueIndex) => (
            <div key={dialogueIndex} className="dialogue">
              <div 
                className="character-name"
                style={{ 
                  backgroundColor: getCharacterColor(dialogue.character),
                  borderColor: getCharacterBorderColor(dialogue.character)
                }}
              >
                {dialogue.character}
              </div>
              <div 
                className="dialogue-text"
                style={{ 
                  borderColor: getCharacterBorderColor(dialogue.character)
                }}
              >
                {dialogue.text}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
