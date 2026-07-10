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

  // 全体の総文字数を計算
  const totalActionChars = parsedData.scenes.reduce((sum, scene) => 
    sum + scene.actions.reduce((sceneSum, action) => sceneSum + action.length, 0), 0);
  const totalDialogueChars = parsedData.scenes.reduce((sum, scene) => 
    sum + scene.dialogues.reduce((sceneSum, dialogue) => sceneSum + dialogue.text.length, 0), 0);
  const grandTotalChars = totalActionChars + totalDialogueChars;

  return (
    <div className="preview-container">
      <div className="global-stats">
        <h3>全体統計</h3>
        <div className="global-stats-content">
          <span className="stat-item">ト書き: {totalActionChars}文字</span>
          <span className="stat-item">セリフ: {totalDialogueChars}文字</span>
          <span className="stat-item total">合計: {grandTotalChars}文字</span>
        </div>
      </div>
      
      {parsedData.scenes.map((scene, sceneIndex) => {
        // シーンの総文字数を計算
        const actionTotalChars = scene.actions.reduce((sum, action) => sum + action.length, 0);
        const dialogueTotalChars = scene.dialogues.reduce((sum, dialogue) => sum + dialogue.text.length, 0);
        const totalChars = actionTotalChars + dialogueTotalChars;

        return (
          <div key={sceneIndex} className="scene">
            <h2 className="scene-title">{scene.title}</h2>
            
            <div className="scene-stats">
              <span className="stat-item">ト書き: {actionTotalChars}文字</span>
              <span className="stat-item">セリフ: {dialogueTotalChars}文字</span>
              <span className="stat-item total">合計: {totalChars}文字</span>
            </div>
          
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
              <em>{action}</em>
              <span className="char-count">{action.length}文字</span>
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
                <span className="char-count">{dialogue.text.length}文字</span>
              </div>
            </div>
          ))}
        </div>
        );
      })}
    </div>
  );
}
