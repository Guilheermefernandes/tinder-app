import { Like } from "../../types/like"
import { Post } from "../../types/post"
import { Register } from "../../types/register"
import { User } from "../../types/user"
import { api } from "../api"

type Response = {
    ok: boolean;
    status: number;
    like: Like
}

export const deslike = async (likeId: string, auth: string): Promise<Response> => {

    try{

        const request = await api.delete(`/like/${likeId}`,{
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
        
        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}