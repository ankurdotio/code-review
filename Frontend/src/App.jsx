import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">

          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                minHeight: '100%',  // ✅ Important for scroll
                overflow: 'auto',   // ✅ Scroll within Editor
                whiteSpace: 'pre',
                outline: 'none',
              }}
            />
          </div>



          <div
            onClick={reviewCode}
            className="review">
            Review
          </div>

          <button onClick={() => navigator.clipboard.writeText(code)} className="copy-btn left-copy">
            Copy Code
          </button>



        </div>
        <div className="right">
          <Markdown

            rehypePlugins={[rehypeHighlight]}

          >{review}</Markdown>

          <button onClick={() => navigator.clipboard.writeText(review)} className="copy-btn right-copy">
            Copy Review
          </button>

        </div>
      </main>
    </>
  )
}



export default App