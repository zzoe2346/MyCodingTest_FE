import { Paper, Rating, Stack, Typography, alpha } from "@mui/material";
import { useReview } from "../hooks/useReview.ts";
import { SyntheticEvent } from "react";
import { useSnackbar } from "notistack";

interface ReviewRatingFormProps {
    reviewId: number;
    isMobile: boolean;
}

export const ReviewRatingForm = ({ reviewId, isMobile }: ReviewRatingFormProps) => {
    const {
        difficulty,
        importance,
        setDifficulty,
        setImportance,
        handleSave,
    } = useReview(reviewId);
    const { enqueueSnackbar } = useSnackbar()


    const handleDifficultyChange = (_event: SyntheticEvent<Element, Event>, newValue: number | null) => {
        setDifficulty(newValue);
        handleSave(newValue, importance);
        enqueueSnackbar('체감 난이도 저장 완료!', { variant: 'success' });
    };

    const handleImportanceChange = (_event: SyntheticEvent<Element, Event>, newValue: number | null) => {
        setImportance(newValue);
        handleSave(difficulty, newValue);
        enqueueSnackbar('재복습 필요도 저장 완료!', { variant: 'success' });

    };

    const RatingCard = ({
        title,
        value,
        onChange,
        name
    }: {
        title: string;
        value: number | null;
        onChange: (_event: SyntheticEvent<Element, Event>, newValue: number | null) => void;
        name: string;
    }) => (
        <Paper
            elevation={0}
            sx={{
                flex: 1,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: alpha('#6366f1', 0.02),
                }
            }}
        >
            <Typography
                variant="body2"
                fontWeight={600}
                color="text.secondary"
            >
                {title}
            </Typography>
            <Rating
                size="large"
                name={name}
                value={value}
                onChange={onChange}
                sx={{
                    '& .MuiRating-iconFilled': {
                        color: '#f59e0b',
                    },
                    '& .MuiRating-iconHover': {
                        color: '#f97316',
                    }
                }}
            />
        </Paper>
    );

    return (
        <Stack direction={isMobile ? "column" : "row"} spacing={1.5}>
            <RatingCard
                title="체감 난이도"
                value={difficulty}
                onChange={handleDifficultyChange}
                name="difficulty-rating"
            />
            <RatingCard
                title="재복습 필요도"
                value={importance}
                onChange={handleImportanceChange}
                name="importance-rating"
            />
        </Stack>
    )
}