import {Divider, Paper, Rating, Stack, Typography} from "@mui/material";
import {useReview} from "../hooks/useReview.ts";
import {SyntheticEvent} from "react";
import {useSnackbar} from "notistack";

interface ReviewRatingFormProps {
    reviewId: number;
    isMobile: boolean;
}

export const ReviewRatingForm = ({reviewId, isMobile}: ReviewRatingFormProps) => {
    const {
        difficulty,
        importance,
        setDifficulty,
        setImportance,
        handleSave,
    } = useReview(reviewId);
    const {enqueueSnackbar} = useSnackbar()


    const handleDifficultyChange = (_event: SyntheticEvent<Element, Event>, newValue: number | null) => {
        setDifficulty(newValue);
        handleSave(newValue, importance);
        enqueueSnackbar('체감 난이도 저장 완료!', {variant: 'success'});
    };

    const handleImportanceChange = (_event: SyntheticEvent<Element, Event>, newValue: number | null) => {
        setImportance(newValue);
        handleSave(difficulty, newValue);
        enqueueSnackbar('재복습 필요도 저장 완료!', {variant: 'success'});

    };

    return (
        <Stack direction={isMobile ? "column" : "row"} spacing={1}>
            <Paper style={{flexGrow: 1, alignItems: "center", display: "flex", flexDirection: "column"}}>
                <Typography variant="body1">체감 난이도</Typography>
                <Rating
                    size={"large"}
                    name="difficulty-rating"
                    value={difficulty}
                    onChange={handleDifficultyChange}
                />
            </Paper>
            <Divider/>
            <Paper style={{flexGrow: 1, alignItems: "center", display: "flex", flexDirection: "column"}}>
                <Typography variant="body1">재복습 필요도</Typography>
                <Rating
                    size={"large"}
                    name="importance-rating"
                    value={importance}
                    onChange={handleImportanceChange}
                />
            </Paper>
        </Stack>
    )
}