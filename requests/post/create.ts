import { Post } from "../../types/post"
import { Register } from "../../types/register"
import { User } from "../../types/user"
import { api } from "../api"

export const createPost = async (auth: string, data: FormData): Promise<Post> => {

    try{

        const request = await api.post('/post', data,{
            headers: {
                Authorization: `Bearer ${auth}`,
                "Content-Type": "multipart/form-data"
            }
        })

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}