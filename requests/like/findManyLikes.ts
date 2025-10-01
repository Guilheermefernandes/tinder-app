import { Like } from "../../types/like"
import { Post } from "../../types/post"
import { Register } from "../../types/register"
import { User } from "../../types/user"
import { api } from "../api"

type Response = {
    ok: boolean;
    status: number;
    like: number
}

export const findManyLike = async (postId: string): Promise<Response> => {

    try{

        const request = await api.get(`/like/${postId}`)

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}