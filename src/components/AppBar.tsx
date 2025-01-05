import { AppBar,Button,Toolbar, Typography  } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink


function MyAppBar() {
    return (
        <AppBar sx={{height: '60px', backgroundColor: 'white' }} position="static">
            <Toolbar>
                <Typography color="primary" variant="h4" sx={{ flexGrow: 1,fontFamily: 'Lilita One, monospace',fontWeigh: '500' }}>
                    My Coding Test👍
                </Typography>
                <Button component={RouterLink} to="/" color="primary">
          리뷰대기
        </Button>
        <Button component={RouterLink} to="/review" color="primary">
          MyProblem
        </Button>
        <Button component={RouterLink} to="/about" color="primary">
          리뷰
        </Button>
                <Button component={RouterLink} to="/login" >Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default MyAppBar;