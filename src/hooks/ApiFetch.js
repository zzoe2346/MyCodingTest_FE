import { useEffect, useState } from 'react';

export default function ApiHook(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json));
    }, []);

    return data;
}