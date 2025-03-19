import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
interface Content {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}
export function useContent(){
    const [contents , setContents] = useState<Content[]>([]);
    async function fetchData(){
        await axios.get(`${BACKEND_URL}api/v1/content`,{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            setContents(res.data.content);
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchData();
        let interval = setInterval(() => {
            fetchData();
        }, 10000);

        return () => clearInterval(interval);
    },[])

    return {contents, fetchData};
  }