import {ImageList, ImageListItem} from "@mui/material";

const BojImageList = () => {
    const imageData = [
        {
            img: "boj/1.png", // 이미지 URL
            title: "boj1",
        },
        {
            img: "boj/2.png", // 이미지 URL
            title: "boj2",
        },
    ];

    return (
        <ImageList sx={{width: "100%"}} cols={2} rowHeight={350}>
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