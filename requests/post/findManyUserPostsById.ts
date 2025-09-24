import { Post } from "../../types/post"
import { Register } from "../../types/register"
import { User } from "../../types/user"
import { api } from "../api"

export const getPostById = async (auth: string, param: string): Promise<Post[]> => {

    try{

        const request = await api.get(`/post/${param}`, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}