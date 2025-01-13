export const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0'); // 날짜 (두 자릿수)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (두 자릿수)
    const year = String(date.getFullYear()).slice(2); // 연도 (두 자릿수)
    const hours = String(date.getHours()).padStart(2, '0'); // 시간 (두 자릿수)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 분 (두 자릿수)

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
};
