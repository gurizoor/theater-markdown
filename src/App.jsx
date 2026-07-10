import { useState, useEffect } from 'react'
import Editor from './Editor'
import Preview from './Preview'
import { parseScript } from './parser'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [parsedData, setParsedData] = useState(null)

  useEffect(() => {
    if (text) {
      setParsedData(parseScript(text))
    } else {
      setParsedData(null)
    }
  }, [text])

  const handleSave = () => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'script.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleLoad = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setText(event.target.result)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎭 演劇部台本エディター</h1>
        <div className="header-buttons">
          <label className="button">
            📂 読み込み
            <input type="file" accept=".md,.txt" onChange={handleLoad} style={{ display: 'none' }} />
          </label>
          <button className="button" onClick={handleSave}>
            💾 保存
          </button>
        </div>
      </header>
      <div className="main-content">
        <div className="editor-section">
          <h2>エディター</h2>
          <Editor value={text} onChange={setText} />
        </div>
        <div className="preview-section">
          <h2>プレビュー</h2>
          <Preview parsedData={parsedData} />
        </div>
      </div>
    </div>
  )
}

export default App
