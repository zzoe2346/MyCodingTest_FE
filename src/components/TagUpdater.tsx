import {useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Paper, Stack, Tooltip} from "@mui/material";
import apiClient from "../api/apiClient.ts";
import {useSnackbar} from "notistack";

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

const TagUpdater: React.FC<{ solvedProblemId: string }> = ({solvedProblemId}) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태 추가
    const {enqueueSnackbar} = useSnackbar();

    const fetchInitialTags = async () => {
        try {
            const response = await apiClient.get(`/api/solved-problems/${solvedProblemId}/tags`);
            const tagIds: number[] = response.data.tagIds;
            const initialTags = tagIds
                .sort()
                .map((tagId) => algorithmTags.find((tag) => tag.id === tagId))
                .filter((tag): tag is Tag => tag !== undefined);
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
            await apiClient.put(`/api/solved-problems/${solvedProblemId}/tags`, {tagIds});
            enqueueSnackbar('태그 저장 완료!', {variant: 'success'});
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating tags:', error);
            enqueueSnackbar('태그 저장 실패', {variant: 'error'}); // 실패 알림
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false); // 취소 버튼 클릭 시 편집 모드 종료
        fetchInitialTags(); // 취소 시 기존 태그 다시 불러오기
    };

    return (
        <Paper sx={{padding: 2}}>
            <Stack spacing={2}>
                <Tooltip
                    title={!isEditing ? '태그를 수정하려면 "태그 수정" 버튼을 클릭하세요.' : ''} // 조건부 툴팁 메시지
                    disableHoverListener={isEditing} // 편집 모드일 때는 툴팁 비활성화
                    placement="top-start"
                >
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={algorithmTags}
                        getOptionLabel={(option) => option.title}
                        value={selectedTags}
                        onChange={(_event, newValue) => setSelectedTags(newValue)}
                        filterSelectedOptions
                        disabled={!isEditing} // 편집 모드에 따라 disabled 상태 변경
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="알고리즘 태그"
                                placeholder=""
                                sx={{
                                    // 비활성화된 상태일 때의 스타일
                                    ".Mui-disabled": {
                                        opacity: 0.9, // 또는 원하는 불투명도
                                        WebkitTextFillColor: "currentcolor", // 텍스트 색상 유지
                                    }
                                }}
                            />
                        )}
                    />
                </Tooltip>

                {!isEditing && ( // 편집 모드가 아닐 때 수정 버튼 표시
                    <Button variant="outlined" onClick={handleEditClick}>
                        태그 수정
                    </Button>
                )}

                {isEditing && ( // 편집 모드일 때 저장, 취소 버튼 표시
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
