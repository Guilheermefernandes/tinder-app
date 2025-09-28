import { Hobbies } from "../../types/hobies"
import { Post } from "../../types/post"
import { Register } from "../../types/register"
import { User } from "../../types/user"
import { api } from "../api"

export const getHobbiesUser = async (auth: string): Promise<Hobbies[]> => {

    try{

        const request = await api.get(`/hobies/me`, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}