
import { Grid2 } from '@mui/material'
import './App.css'
import MyAppBar from './components/AppBar'
import CodeArea from './components/CodeArea'
import WriteArea from './components/WriteArea'

function App() {

  return (
    <>
      <MyAppBar />

      <Grid2 container spacing={2} style={{ height: '100vh' }}>
  
        {/* 좌측 코드 영역 */}
        <Grid2 size={8} sx={{ pl: 2, pr: 1 ,pt: 2, pb: 10}}>
          <CodeArea />
        </Grid2>

        {/* 우측 글 작성 영역 */}
        <Grid2 size={4} sx={{ pl: 1, pr: 2 , pt: 2, pb: 10}}>
          <WriteArea />
        </Grid2>
      </Grid2>

    </>
  )
}

export default App
