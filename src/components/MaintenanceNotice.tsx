import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import { useState } from "react";

const MaintenanceNotice = () => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="maintenance-dialog-title"
            aria-describedby="maintenance-dialog-description"
        >
            <DialogTitle id="maintenance-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BuildRoundedIcon color="warning" />
                서비스 점검 안내
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="maintenance-dialog-description">
                    현재 서버를 리팩토링 중입니다.<br/>
                    서비스 이용에 불편을 드려 죄송합니다.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    닫기
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MaintenanceNotice;
