import {Button} from "@mui/material";
import React from "react";

interface ReviewStatusChangeButtonProps {
    reviewed: boolean;
    reviewedAt: string | null;
    onStatusChange: () => void;
}

export const ReviewStatusChangeButton: React.FC<ReviewStatusChangeButtonProps> = ({reviewed, reviewedAt, onStatusChange}) => {
    return (
        <Button
            sx={{minHeight: 55, width: '100%'}}
            variant="contained"
            color={reviewed ? "success" : "info"}
            onClick={reviewed ? undefined : onStatusChange}
        >
            {reviewed ? `${reviewedAt} 복습 완료!` : "복습 완료 하기"}
        </Button>
    );
};