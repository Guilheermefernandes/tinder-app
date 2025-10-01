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

export const createLike = async (postId: string, auth: string): Promise<Response> => {

    try{

        console.log(auth)

        const request = await api.post(`/like/${postId}`, {},{
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
''
        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}