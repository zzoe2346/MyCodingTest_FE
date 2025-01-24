import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Button, CircularProgress, Typography} from '@mui/material';
import apiClient from '../api/apiClient.ts';

interface Tag {
    title: string;
    id: number;
}

const algorithmTags: Tag[] = [
    {title: "BackTracking", id: 1},
    {title: "BFS", id: 2},
    {title: "BinarySearch", id: 3},
    {title: "Bitmask", id: 4},
    {title: "Bruteforce", id: 5},
    {title: "DFS", id: 6},
    {title: "DP", id: 7},
    {title: "DataStructure", id: 8},
    {title: "Dijkstra", id: 9},
    {title: "DisjointSet", id: 10},
    {title: "DivideAndConquer", id: 11},
    {title: "Graph", id: 12},
    {title: "Greedy", id: 13},
    {title: "Implementation", id: 14},
    {title: "Knapsack", id: 15},
    {title: "Math", id: 16},
    {title: "ParametricSearch", id: 17},
    {title: "PrefixSum", id: 18},
    {title: "PriorityQueue", id: 19},
    {title: "Recursion", id: 20},
    {title: "SegmentTree", id: 21},
    {title: "Set/Map", id: 22},
    {title: "ShortestPath", id: 23},
    {title: "SlidingWindow", id: 24},
    {title: "Sorting", id: 25},
    {title: "TowPointer", id: 26},
    {title: "Tree", id: 27},
];

interface TagSelectorProps {
    onTagSelect: (tagId: number | null) => void; // 태그 선택 시 호출될 콜백 함수
}

const TagSelector: React.FC<TagSelectorProps> = ({onTagSelect}) => {
    const [tagIds, setTagIds] = useState<number[]>([]);
    const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const tagResponse = await apiClient.get<{ tagIds: number[] }>(
                    '/api/solved-problems/tags'
                );
                setTagIds(tagResponse.data.tagIds);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTagChange = (tagId: number) => {
        const newSelectedTagId = selectedTagId === tagId ? null : tagId;
        setSelectedTagId(newSelectedTagId);
        onTagSelect(newSelectedTagId);
    };

    const getTagName = (tagId: number): string => {
        const tag = algorithmTags.find((t) => t.id === tagId);
        return tag ? tag.title : 'Unknown Tag';
    };

    return (
        <Box>
            <Box sx={{display: 'flex', gap: 1, mb: 2}}>
                {isLoading ? (
                    <CircularProgress/>
                ) : (
                    tagIds.map((tagId) => (
                        <Button
                            key={tagId}
                            variant={selectedTagId === tagId ? 'contained' : 'outlined'}
                            onClick={() => handleTagChange(tagId)}
                            sx={{textTransform: 'none'}}
                        >
                            {getTagName(tagId)}
                        </Button>
                    ))
                )}
            </Box>

            {error && (
                <Typography color="error" sx={{mb: 2}}>
                    Error: {error}
                </Typography>
            )}
        </Box>
    );
};

export default TagSelector;