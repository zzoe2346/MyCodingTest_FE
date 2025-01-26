import {Container, Divider, Stack, Typography} from "@mui/material";
import TagSelector from "../components/TagSelectBar.tsx";
import {useState} from "react";
import SolvedProblemTable from "../components/SolvedProblemTable.tsx";

export default () => {
    const [selectedTagId, setSelectedTagId] = useState<number | null>(null);

    const handleTagSelect = (tagId: number | null) => {
        setSelectedTagId(tagId);
    };

    return (
        <Container>
            <Stack spacing={1}>
                <Typography variant="h6"> 🔎 태그별 문제 모음 </Typography>
                <Divider/>
                <TagSelector onTagSelect={handleTagSelect}></TagSelector>
                {selectedTagId ?
                    <SolvedProblemTable key={selectedTagId} isFavorite={false} isReviewed={null} isTagged={true}
                                        tagId={selectedTagId}
                                        initSortField={"recentSubmitAt"}/>
                    :
                    <Typography variant="h6">✅ 모아 보고 싶은 태그를 선택해 주세요</Typography>
                }
            </Stack>
        </Container>
    );
}