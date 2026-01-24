import React from 'react';
import { IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface FavoriteButtonProps {
    isFavorite: boolean;
    onToggle: (newValue: boolean) => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggle }) => {
    const handleClick = () => {
        onToggle(!isFavorite);
    };

    return (
        <IconButton 
            onClick={handleClick} 
            color={isFavorite ? "primary" : "default"}
            aria-label={isFavorite ? "remove from favorites" : "add to favorites"}
            sx={{ 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: '8px', 
                height: 55, 
                width: 55,
                backgroundColor: 'white',
            }}
        >
            {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
    );
};
