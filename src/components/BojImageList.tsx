import {ImageList, ImageListItem} from "@mui/material";

const BojImageList = () => {
    const imageData = [
        {
            img: "boj/3채점진행1.png", // 이미지 URL
            title: "Image 3",
        },
        {
            img: "boj/4채점완료1.png", // 이미지 URL
            title: "Image 4",
        },
    ];

    return (
        <ImageList sx={{width: "100%"}} cols={3} rowHeight={350}>
            {imageData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        style={{width: "auto", height: "100%", objectFit: "contain"}}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default BojImageList;