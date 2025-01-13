import {useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useParams} from 'react-router-dom';
import {Paper} from "@mui/material";
import api from "../api/api.ts";

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

const TagUpdater = () => {
    const {solvedProblemId} = useParams();
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const fetchInitialTags = async () => {
        try {
            const response = await api.get(`/api/solved-problems/${solvedProblemId}/tags`);
            const tagIds: number[] = response.data.tagIds; // tagIds 추출
            const initialTags = tagIds
                .map(tagId => algorithmTags.find(tag => tag.id === tagId))
                .filter((tag): tag is Tag => tag !== undefined); // 타입 가드로 undefined 제거
            setSelectedTags(initialTags);
        } catch (error) {
            console.error('Error fetching initial tags:', error);
        }
    };

    useEffect(() => {
        fetchInitialTags();
    }, [solvedProblemId]);

    const handleUpdateTags = async () => {
        const tagIds = selectedTags.map((tag) => tag.id);
        try {
            await api.put(`/api/solved-problems/${solvedProblemId}/tags`, {tagIds});
            console.log('Tags updated successfully!');
        } catch (error) {
            console.error('Error updating tags:', error);
        }
    };

    return (
        <Paper sx={{padding: 2}}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={algorithmTags}

                getOptionLabel={(option) => option.title}
                value={selectedTags}
                onChange={(_event, newValue) => setSelectedTags(newValue)}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Algorithm Tags"
                        placeholder="Select tags"
                    />
                )}
            />
            <Button variant="text" onClick={handleUpdateTags}>
                태그 저장
            </Button>
        </Paper>
    );
};

export default TagUpdater;
