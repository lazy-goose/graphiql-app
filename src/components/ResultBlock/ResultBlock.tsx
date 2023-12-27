import { javascript } from '@codemirror/lang-javascript'
import {
  Paper,
  Tab,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  styled,
} from '@mui/material'
import { bbedit } from '@uiw/codemirror-theme-bbedit'
import CodeMirror from '@uiw/react-codemirror'

const mockData = { totalCount: 336, values: ['hdgfygf', 'kefije'] }
const json = JSON.stringify(mockData, null, 2)

type StyledTabProps = {
  label: string
  value: string
}

const AntTabs = styled(Tabs)({})
const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(() => ({
  cursor: 'default',
}))

export function ResultBlock() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: '0' }} align="left">
              <AntTabs value="response">
                <AntTab value="response" label={'RESPONSE'}></AntTab>
              </AntTabs>
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
