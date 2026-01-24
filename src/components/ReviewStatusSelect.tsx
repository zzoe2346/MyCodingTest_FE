import {FormControl, MenuItem, Select, SelectChangeEvent, alpha} from "@mui/material";
import React from "react";

type ReviewStatus = 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED';

interface ReviewStatusSelectProps {
    status: ReviewStatus;
    onStatusChange: (newStatus: ReviewStatus) => void;
}

// Status color configuration
const statusStyles = {
    TO_DO: {
        backgroundColor: alpha('#78909c', 0.1),
        borderColor: '#78909c',
        color: '#455a64',
    },
    IN_PROGRESS: {
        backgroundColor: alpha('#2196f3', 0.1),
        borderColor: '#2196f3',
        color: '#1565c0',
    },
    COMPLETED: {
        backgroundColor: alpha('#4caf50', 0.1),
        borderColor: '#4caf50',
        color: '#2e7d32',
    },
    MASTERED: {
        backgroundColor: alpha('#9c27b0', 0.1),
        borderColor: '#9c27b0',
        color: '#6a1b9a',
    },
};

export const ReviewStatusSelect: React.FC<ReviewStatusSelectProps> = ({status, onStatusChange}) => {
    const handleChange = (event: SelectChangeEvent) => {
        const newStatus = event.target.value as ReviewStatus;
        onStatusChange(newStatus);
    };

    const currentStyle = statusStyles[status];

    return (
        <FormControl fullWidth>
            <Select
                value={status}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Review Status' }}
                sx={{ 
                    height: 55,
                    backgroundColor: currentStyle.backgroundColor,
                    border: `2px solid ${currentStyle.borderColor}`,
                    borderRadius: '8px',
                    fontWeight: 600,
                    color: currentStyle.color,
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&:hover': {
                        backgroundColor: alpha(currentStyle.borderColor, 0.15),
                    },
                    '& .MuiSelect-icon': {
                        color: currentStyle.color,
                    },
                }}
            >
                <MenuItem value="TO_DO" sx={{ color: statusStyles.TO_DO.color, fontWeight: 500 }}>
                    🔘 복습 대기
                </MenuItem>
                <MenuItem value="IN_PROGRESS" sx={{ color: statusStyles.IN_PROGRESS.color, fontWeight: 500 }}>
                    🔵 복습 중
                </MenuItem>
                <MenuItem value="COMPLETED" sx={{ color: statusStyles.COMPLETED.color, fontWeight: 500 }}>
                    ✅ 복습 완료
                </MenuItem>
                <MenuItem value="MASTERED" sx={{ color: statusStyles.MASTERED.color, fontWeight: 500 }}>
                    🌟 완벽히 이해
                </MenuItem>
            </Select>
        </FormControl>
    );
};
