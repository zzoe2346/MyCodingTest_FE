import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import apiClient from "../api/apiClient.ts";
import {useSnackbar} from "notistack"; // axios import 추가

interface DeleteButtonProps {
    solvedProblemId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({solvedProblemId}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            await apiClient.delete(`/api/solved-problems/${solvedProblemId}`);
            handleClose();
            enqueueSnackbar('삭제 성공!', {variant: 'info'});
            navigate('/');
        } catch (error) {
            console.error('Error deleting solved problem:', error);
        }
    };

    return (
        <div>
            <Button variant={"outlined"} onClick={handleClickOpen}
                    sx={{
                        minHeight: 55,
                        width: '100%',
                        color: 'red'
                    }}>
                <DeleteIcon/>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"❗️삭제 확인❗️"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        현재 문제와 관련된 데이터들이 모두 삭제됩니다. 정말 삭제하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        아니오
                    </Button>
                    <Button onClick={handleDelete} color="error" sx={{pl: 2, pr: 2}}>
                        네
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteButton;