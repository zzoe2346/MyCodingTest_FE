import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert, Paper, Stack, Tooltip } from "@mui/material";
import apiClient from "../api/apiClient.ts";
import { useSnackbar } from "notistack";

interface Tag {
    title: string;
    id: number;
}

const algorithmTags: Tag[] = [
    { title: "BackTracking", id: 1 },
    { title: "BFS", id: 2 },
    { title: "BinarySearch", id: 3 },
    { title: "Bitmask", id: 4 },
    { title: "BruteForce", id: 5 },
    { title: "DFS", id: 6 },
    { title: "DP", id: 7 },
    { title: "DataStructure", id: 8 },
    { title: "Dijkstra", id: 9 },
    { title: "DisjointSet", id: 10 },
    { title: "DivideAndConquer", id: 11 },
    { title: "Graph", id: 12 },
    { title: "Greedy", id: 13 },
    { title: "Implementation", id: 14 },
    { title: "Knapsack", id: 15 },
    { title: "Math", id: 16 },
    { title: "ParametricSearch", id: 17 },
    { title: "PrefixSum", id: 18 },
    { title: "PriorityQueue", id: 19 },
    { title: "Recursion", id: 20 },
    { title: "SegmentTree", id: 21 },
    { title: "Set/Map", id: 22 },
    { title: "ShortestPath", id: 23 },
    { title: "SlidingWindow", id: 24 },
    { title: "Sorting", id: 25 },
    { title: "TwoPointer", id: 26 },
    { title: "Tree", id: 27 },
    { title: "✏️ 다시 풀기", id: 28 },
    { title: "⭐️ 중요", id: 29 },
    { title: "🎯 취약", id: 30 },
    { title: "🔁 자주 복습", id: 31 },
    { title: "🔥 어려운 문제", id: 32 },
    { title: "💡 아이디어", id: 33 },
    { title: "📚 개념 복습", id: 34 },
    { title: "🛠️ 구현 연습", id: 35 },
    { title: "🧐 헷갈림", id: 36 },
    { title: "📝 암기", id: 37 },
    { title: "🤔 다양한 풀이", id: 38 },
    { title: "👍 좋은 문제", id: 39 },
    { title: "👀 나중에 풀기", id: 40 },
    { title: "🤯 실수", id: 41 },
    { title: "⏰ 시간 초과", id: 42 },
    { title: "Ad-hoc", id: 43 },
    { title: "Geometry", id: 44 },
    { title: "Simulation", id: 45 },
    { title: "Hashing", id: 46 },
    { title: "GameTheory", id: 47 },
    { title: "Stack", id: 48 },
    { title: "LIS", id: 49 },
    { title: "Queue", id: 50 },
    { title: "0-1 BFS", id: 51 },
    { title: "String", id: 52 }
].sort((a, b) => a.title.localeCompare(b.title));

const TagUpdater: React.FC<{ solvedProblemId: string }> = ({ solvedProblemId }) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true); // API 사용 가능 여부
    const { enqueueSnackbar } = useSnackbar();

    const fetchInitialTags = async () => {
        try {
            // const response = await apiClient.get(`/api/solved-problems/${solvedProblemId}/tags`);
            const tagIds: number[] = []; //response.data.tagIds;
            const initialTags = tagIds
                .sort()
                .map((tagId) => algorithmTags.find((tag) => tag.id === tagId))
                .filter((tag): tag is Tag => tag !== undefined)
                .sort((a, b) => a.title.localeCompare(b.title));
            setSelectedTags(initialTags);
            setIsAvailable(true);
        } catch (error) {
            console.warn('태그 API 아직 미구현:', error);
            setSelectedTags([]);
            setIsAvailable(false);
        }
    };

    useEffect(() => {
        fetchInitialTags();
    }, [solvedProblemId]);

    const handleUpdateTags = async () => {
        if (!isAvailable) {
            enqueueSnackbar('태그 기능이 아직 준비 중입니다', { variant: 'info' });
            setIsEditing(false);
            return;
        }

        const tagIds = selectedTags.map((tag) => tag.id);
        try {
            await apiClient.put(`/api/solved-problems/${solvedProblemId}/tags`, { tagIds });
            enqueueSnackbar('태그 저장 완료!', { variant: 'success' });
            setIsEditing(false);
        } catch (error) {
            console.warn('태그 저장 API 미구현:', error);
            enqueueSnackbar('태그 기능이 아직 준비 중입니다', { variant: 'info' });
            setIsAvailable(false);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        fetchInitialTags();
    };

    const handleTagChange = (_event: React.SyntheticEvent, newValue: Tag[]) => {
        if (newValue.length <= 7) {
            setSelectedTags(newValue);
        } else {
            enqueueSnackbar('태그는 7개까지만 추가할 수 있습니다.', { variant: 'warning' });
        }
    };

    // API 미구현 시 안내 메시지 표시
    if (!isAvailable) {
        return (
            <Paper>
                <Alert severity="info" sx={{ borderRadius: '12px' }}>
                    태그 기능이 준비 중입니다 🏷️
                </Alert>
            </Paper>
        );
    }

    return (
        <Paper>
            <Stack spacing={0.5}>
                <Tooltip
                    title={!isEditing ? '태그를 수정하려면 "태그 수정" 버튼을 클릭하세요.' : ''}
                    disableHoverListener={isEditing}
                    placement="top-start"
                >
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={algorithmTags}
                        getOptionLabel={(option) => option.title}
                        value={selectedTags}
                        onChange={handleTagChange}
                        filterSelectedOptions
                        disabled={!isEditing}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="태그(최대 7개)"
                                placeholder=""
                                sx={{
                                    ".Mui-disabled": {
                                        opacity: 0.9,
                                        WebkitTextFillColor: "currentcolor",
                                    }
                                }}
                            />
                        )}
                    />
                </Tooltip>

                {!isEditing && (
                    <Button variant="outlined" onClick={handleEditClick}>
                        태그 수정
                    </Button>
                )}

                {isEditing && (
                    <>
                        <Button variant="outlined" onClick={handleUpdateTags}>
                            저장
                        </Button>
                        <Button variant="outlined" onClick={handleCancelClick}>
                            취소
                        </Button>
                    </>
                )}
            </Stack>
        </Paper>
    );
};

export default TagUpdater;
