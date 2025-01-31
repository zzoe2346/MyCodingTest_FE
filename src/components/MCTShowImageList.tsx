import { ImageList, ImageListItem } from "@mui/material";

const MCTShowImageList = () => {
    const imageData = [
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
        <ImageList sx={{ width: "100%", maxHeight: "400px", overflowY: "scroll" }} cols={2} rowHeight={350}>
            {imageData.map((item) => (
                <ImageListItem key={item.img} sx={{ border: "1px solid black" }}>
                    <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default MCTShowImageList;