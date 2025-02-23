import {Button} from "@mui/material";
import {useReview} from "../hooks/useReview.ts";
import React from "react";

interface ReviewStatusChangeButtonProps {
    reviewId: number;
}

export const ReviewStatusChangeButton: React.FC<ReviewStatusChangeButtonProps> = ({reviewId}) => {
    const {reviewed, handleStatusChange, reviewedAt} = useReview(reviewId);

    return (
        <Button
            sx={{minHeight: 55, width: '100%'}}
            variant="contained"
            color={reviewed ? "success" : "info"}
            onClick={reviewed ? undefined : handleStatusChange}
        >
            {reviewed ? `${reviewedAt} 복습 완료!` : "복습 완료 하기"}
        </Button>
    );
};