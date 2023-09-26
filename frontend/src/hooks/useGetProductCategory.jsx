import { useState , useEffect } from "react";
import axios from "axios";

const useGetProductData = (url) => {
    const [data , setData] = useState([]);
    const [error , setError] = useState(null);

    useEffect(() => {
        axios.get(url)
        .then(response => {
            setData(response.data.data)
        })
        .catch(error => {
            setError(error)
        })
    } , [url])

    return {data , error}
}

export default useGetProductData