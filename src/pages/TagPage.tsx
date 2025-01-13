import {Container, Stack, Typography} from "@mui/material";
import TagSelector from "../components/TagSelector.tsx";
import {useState} from "react";
import SolvedProblemTable from "../components/SolvedProblemTable.tsx";

export default () => {
    const [selectedTagId, setSelectedTagId] = useState<number | null>(null);

    const handleTagSelect = (tagId: number | null) => {
        setSelectedTagId(tagId);
        console.log(tagId);
    };

    return (
        <Container maxWidth="xl" sx={{mt: "10px"}}>
            <Stack spacing={2}>
                <TagSelector onTagSelect={handleTagSelect}></TagSelector>
                {selectedTagId ?
                    <SolvedProblemTable isFavorite={false} isReviewed={null} isTagged={true} tagId={selectedTagId}
                                        initSortField={"recentSubmitAt"}/>
                    :
                    <Typography variant="h6">모아 보고 싶은 태그를 선택해 주세요</Typography>
                }
            </Stack>
        </Container>
    );
}