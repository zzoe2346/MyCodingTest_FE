import { Box, ImageList, ImageListItem, useMediaQuery } from "@mui/material";

const MCTShowImageList = () => {
    const isMobile = useMediaQuery('(max-width:1200px)');

    const imageData = [
        {
            img: "mctshow/0.gif", // 이미지 URL
            title: "Image 0",
        },
        {
            img: "mctshow/1.png", // 이미지 URL
            title: "Image 1",
        },
        {
            img: "mctshow/2.png", // 이미지 URL
            title: "Image 2",
        },
        {
            img: "mctshow/3.png", // 이미지 URL
            title: "Image 3",
        },
        {
            img: "mctshow/4.png", // 이미지 URL
            title: "Image 4",
        },
        {
            img: "mctshow/5.png", // 이미지 URL
            title: "Image 5",
        },
        {
            img: "mctshow/6.png", // 이미지 URL
            title: "Image 6",
        },
    ];

    return (
        <ImageList
            sx={{ width: "100%", maxHeight: isMobile ? "auto" : "400px", overflowY: "scroll" }}
            cols={isMobile ? 1 : 2} // 모바일에서는 1열, 아니면 2열
            rowHeight={isMobile ? "auto" : 350} // 모바일에서는 자동, 아니면 350px
        >
            {imageData.map((item) => (
                <ImageListItem key={item.img} sx={{ border: "0.5px solid black" }}>
                    <Box
                        component="img"
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        sx={{
                            width: "100%",
                            height: isMobile ? "auto" : "100%",
                            objectFit: "contain",
                            aspectRatio: isMobile ? "auto" : "auto" // 모바일에서 이미지 비율을 1:1로 조정
                        }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default MCTShowImageList;