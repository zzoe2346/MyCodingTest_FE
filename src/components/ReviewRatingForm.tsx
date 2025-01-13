import {Divider, Paper, Rating, Stack, Typography} from "@mui/material";
import {useReview} from "../hooks/useReview.ts";

interface ReviewRatingFormProps {
    reviewId: number;
}

export const ReviewRatingForm = ({reviewId}: ReviewRatingFormProps) => {
    const {
        difficulty,
        importance,
        handleDifficultyChange,
        handleImportanceChange,
    } = useReview(reviewId);

    return (
        <Stack direction="row" spacing={1}>
            <Paper style={{padding: 10, flexGrow: 1, alignItems: "center", display: "flex", flexDirection: "column"}}>
                <Typography variant="body1">체감 난이도</Typography>
                <Rating
                    size={"large"}
                    name="difficulty-rating"
                    value={difficulty}
                    onChange={handleDifficultyChange}
                />
            </Paper>
            <Divider/>
            <Paper style={{padding: 10, flexGrow: 1, alignItems: "center", display: "flex", flexDirection: "column"}}>
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