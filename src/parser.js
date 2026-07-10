export function parseScript(text) {
  const lines = text.split('\n');
  const result = {
    scenes: []
  };

  let currentScene = null;
  let shortcuts = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 空行はスキップ
    if (!line) continue;

    // シーンタイトル (# で始まる)
    if (line.startsWith('#')) {
      if (currentScene) {
        result.scenes.push(currentScene);
      }
      currentScene = {
        title: line.substring(1).trim(),
        characters: [],
        shortcuts: {},
        actions: [],
        dialogues: []
      };
      shortcuts = {};
      continue;
    }

    // 登場人物定義
    if (line.startsWith('【登場人物】')) {
      if (currentScene) {
        const chars = line.substring('【登場人物】'.length).split('、');
        currentScene.characters = chars.map(c => c.trim()).filter(c => c);
      }
      continue;
    }

    // ショートカット定義 (名前 = 番号)
    const shortcutMatch = line.match(/^(.+?)\s*=\s*(\d+)$/);
    if (shortcutMatch && currentScene) {
      const name = shortcutMatch[1].trim();
      const number = shortcutMatch[2];
      shortcuts[number] = name;
      currentScene.shortcuts[number] = name;
      continue;
    }

    // ト書き (- で始まる)
    if (line.startsWith('-')) {
      if (currentScene) {
        currentScene.actions.push(line.substring(1).trim());
      }
      continue;
    }

    // セリフ (名前: セリフ または 番号: セリフ)
    const dialogueMatch = line.match(/^(.+?):\s*(.+)$/);
    if (dialogueMatch && currentScene) {
      let character = dialogueMatch[1].trim();
      const text = dialogueMatch[2].trim();

      console.log('セリフ解析:', character, 'text:', text, 'shortcuts:', shortcuts);

      // ショートカット番号なら名前に変換
      if (shortcuts[character]) {
        character = shortcuts[character];
        console.log('ショートカット変換:', character);
      }

      currentScene.dialogues.push({
        character,
        text
      });
      continue;
    }
  }

  // 最後のシーンを追加
  if (currentScene) {
    result.scenes.push(currentScene);
  }

  return result;
}
