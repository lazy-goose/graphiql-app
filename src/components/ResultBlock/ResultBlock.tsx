import { javascript } from '@codemirror/lang-javascript'
import '@fontsource/source-code-pro'
import {
  Paper,
  Tab,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material'
import { bbedit } from '@uiw/codemirror-theme-bbedit'
import CodeMirror from '@uiw/react-codemirror'
import './ResultBlock.css'

const mockData = { totalCount: 336, values: ['hdgfygf', 'kefije'] }
const json = JSON.stringify(mockData, null, 2)

export function ResultBlock() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: '0' }} align="left">
              <Tabs value="response">
                <Tab
                  disableRipple
                  value="response"
                  label={'RESPONSE'}
                  sx={{ cursor: 'default' }}
                ></Tab>
              </Tabs>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
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
    </TableContainer>
  )
}
