import { Post } from "../../types/post"
import { Register } from "../../types/register"
import { User } from "../../types/user"
import { api } from "../api"

export const findUserById = async (param: string, auth: string): Promise<User> => {

    try{

        const request = await api.get(`/user/${param}`, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}