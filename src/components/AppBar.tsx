import { AppBar,Button,Toolbar, Typography  } from "@mui/material";

function MyAppBar() {
    return (
        <AppBar sx={{height: '60px', backgroundColor: 'white' }} position="static">
            <Toolbar>
                <Typography color="primary" variant="h4" sx={{ flexGrow: 1,fontFamily: 'Lilita One, monospace',fontWeigh: '500' }}>
                    My Coding Test👍
                </Typography>
                <Button>Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default MyAppBar;