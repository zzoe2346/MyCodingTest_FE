import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography, Alert } from '@mui/material';
import apiClient from '../api/apiClient.ts';

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

interface TagSelectorProps {
    onTagSelect: (tagId: number | null) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ onTagSelect }) => {
    const [tagIds, setTagIds] = useState<number[]>([]);
    const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAvailable, setIsAvailable] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const tagResponse = await apiClient.get<{ tagIds: number[] }>(
                    '/api/solved-problems/tags'
                );
                setTagIds(tagResponse.data.tagIds);
                setIsAvailable(true);
            } catch (err) {
                console.warn('태그 목록 API 아직 미구현:', err);
                setTagIds([]);
                setIsAvailable(false);
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

    const getSortedTagIds = (tagIds: number[]): number[] => {
        return tagIds
            .map((tagId) => algorithmTags.find((tag) => tag.id === tagId))
            .filter((tag): tag is Tag => tag !== undefined)
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((tag) => tag.id);
    };

    // API 미구현 시 빈 상태 표시 (에러 없이)
    if (!isAvailable) {
        return (
            <Box sx={{ mb: 2 }}>
                <Alert severity="info" sx={{ borderRadius: '8px' }}>
                    태그 필터 기능이 준비 중입니다 🏷️
                </Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Box maxWidth='xl' sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 0 }}>
                {isLoading ? (
                    <CircularProgress />
                ) : tagIds.length === 0 ? (
                    <Typography color="text.secondary" sx={{ py: 1 }}>
                        등록된 태그가 없습니다
                    </Typography>
                ) : (
                    getSortedTagIds(tagIds).map((tagId) => (
                        <Button
                            key={tagId}
                            variant={selectedTagId === tagId ? 'contained' : 'outlined'}
                            onClick={() => handleTagChange(tagId)}
                            sx={{ textTransform: 'none' }}
                        >
                            {getTagName(tagId)}
                        </Button>
                    ))
                )}
            </Box>
        </Box>
    );
};

export default TagSelector;