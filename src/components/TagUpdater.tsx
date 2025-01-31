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
    {title: "BruteForce", id: 5},
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
    {title: "TwoPointer", id: 26},
    {title: "Tree", id: 27},
    {title: "✏️ 다시 풀기", id: 28},
    {title: "⭐️ 중요", id: 29},
    {title: "🎯 취약", id: 30},
    {title: "🔁 자주 복습", id: 31},
    {title: "🔥 어려운 문제", id: 32},
    {title: "💡 아이디어", id: 33},
    {title: "📚 개념 복습", id: 34},
    {title: "🛠️ 구현 연습", id: 35},
    {title: "🧐 헷갈림", id: 36},
    {title: "📝 암기", id: 37},
    {title: "🤔 다양한 풀이", id: 38},
    {title: "👍 좋은 문제", id: 39},
    {title: "👀 나중에 풀기", id: 40},
    {title: "🤯 실수", id: 41},
    {title: "⏰ 시간 초과", id: 42},
    {title: "Ad-hoc", id: 43},
    {title: "Geometry", id: 44},
    {title: "Simulation", id: 45},
    {title: "Hashing", id: 46},
    {title: "GameTheory", id: 47},
    {title: "Stack", id: 48},
    {title: "LIS", id: 49},
    {title: "Queue", id: 50},
    {title: "0-1 BFS", id: 51},
    {title: "String", id: 52}
].sort((a, b) => a.title.localeCompare(b.title));

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
                .filter((tag): tag is Tag => tag !== undefined)
                .sort((a, b) => a.title.localeCompare(b.title));
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
    const handleTagChange = (_event: any, newValue: Tag[]) => {
        if (newValue.length <= 7) {
            setSelectedTags(newValue);
        } else {
            enqueueSnackbar('태그는 7개까지만 추가할 수 있습니다.', {variant: 'warning'});
        }
    };

    return (
        <Paper>
            <Stack spacing={0.5}>
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
                        // onChange={(_event, newValue) => setSelectedTags(newValue)}
                        onChange={handleTagChange}
                        filterSelectedOptions
                        disabled={!isEditing} // 편집 모드에 따라 disabled 상태 변경
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="태그(최대 7개)"
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
