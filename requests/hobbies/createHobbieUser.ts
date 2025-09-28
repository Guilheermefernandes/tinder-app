import { Hobbies } from "../../types/hobies"
import { Post } from "../../types/post"
import { Register } from "../../types/register"
import { User } from "../../types/user"
import { api } from "../api"

export const createHobbieUser = async (auth: string, data: { hobbieId: string }): Promise<{hobbie: Hobbies, ok: boolean, status: number}> => {

    try{

        const request = await api.post(`/hobies`, data, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}