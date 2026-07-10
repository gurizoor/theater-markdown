export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>使い方</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <section className="help-section">
            <h3>📝 基本的な構文</h3>
            <div className="help-item">
              <code># シーンタイトル</code>
              <p>シーンのタイトルを指定します</p>
            </div>
            <div className="help-item">
              <code>@ 田中 佐藤</code>
              <p>登場人物をスペース区切りで指定します</p>
            </div>
            <div className="help-item">
              <code>田中 = 1</code>
              <p>キャラクター名を数字でショートカット登録します</p>
            </div>
            <div className="help-item">
              <code>- ト書き</code>
              <p>動作や情景の説明を書きます</p>
            </div>
            <div className="help-item">
              <code>田中: セリフ</code>
              <p>キャラクターのセリフを書きます</p>
            </div>
            <div className="help-item">
              <code>1: セリフ</code>
              <p>ショートカット番号でもセリフを書けます</p>
            </div>
          </section>

          <section className="help-section">
            <h3>🎨 サンプル</h3>
            <pre className="help-sample">
{`# 教室
@ 田中 佐藤
田中 = 1
佐藤 = 2

- 田中が教室に入ってくる

田中: こんにちは
1: やあ、元気？
2: ああ、元気だよ

- 佐藤が立ち上がる

1: 先生が来るよ
田中: そうか、じゃあ席に着くね`}
            </pre>
          </section>

          <section className="help-section">
            <h3>⚙️ 機能</h3>
            <ul className="help-list">
              <li><strong>表示切り替え</strong>: 両方/エディター/プレビューで表示を切り替え</li>
              <li><strong>保存</strong>: 台本を.mdファイルとしてダウンロード</li>
              <li><strong>読み込み</strong>: 既存の.mdファイルを開く</li>
              <li><strong>リアルタイムプレビュー</strong>: 入力するとすぐにプレビューが更新</li>
              <li><strong>キャラクター色分け</strong>: 各キャラクターが自動的に色分け表示</li>
            </ul>
          </section>

          <section className="help-section">
            <h3>💡 ヒント</h3>
            <ul className="help-list">
              <li>ショートカットを使うと、同じキャラクターのセリフを素早く入力できます</li>
              <li>複数のシーンを続けて書くことができます</li>
              <li>空行は自動的にスキップされます</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
