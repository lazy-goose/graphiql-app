import { javascript } from '@codemirror/lang-javascript'
import { bbedit } from '@uiw/codemirror-theme-bbedit'
import CodeMirror from '@uiw/react-codemirror'

const mockData = { totalCount: 336, values: ['hdgfygf', 'kefije'] }
const json = JSON.stringify(mockData, null, 2)

export function ResultBlock() {
  return (
    <CodeMirror
      editable={false}
      value={json}
      theme={bbedit}
      height="100%"
      extensions={[javascript({ jsx: true })]}
      basicSetup={{
        highlightActiveLine: false,
        highlightActiveLineGutter: false,
      }}
    />
  )
}
