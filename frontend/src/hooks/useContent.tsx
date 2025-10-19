import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
interface Content {
    title: string;
    link: string;
    type: "twitter" | "youtube";
    _id: string;
}
export function useContent(){
    const [contents , setContents] = useState<Content[]>([]);
    async function fetchData(){
        await axios.get(`${BACKEND_URL}api/v1/content`,{
            withCredentials: true,
        }).then((res) => {
            setContents(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleDelete = async (id:string) => {
        try{
            const res = await axios.delete(`${BACKEND_URL}api/v1/content/${id}`, {
                withCredentials: true,
            });
            if(res.status === 200){
                console.log('Content deleted successfully');
                setContents(contents.filter(c => c._id !== id));
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData();
    },[])

    return {contents, fetchData, handleDelete};
  }