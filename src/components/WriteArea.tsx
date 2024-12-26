import { Button, Paper, TextField, Typography } from "@mui/material";
 
function WriteArea() {
    return (
      <Paper style={{ height: 'calc(100vh - 60px - 50px)', padding: 10 }}>
        <Typography variant="h6" gutterBottom>
          글 작성 공간
        </Typography>
        <TextField
          label="내용을 작성하세요"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          style={{ backgroundColor: '#fff' }}
        />
        <Button>제출</Button>
      </Paper>
    );
  }

  export default WriteArea;