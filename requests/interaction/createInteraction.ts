import { Register } from "../../types/register"
import { User } from "../../types/user"
import { api } from "../api"

export const createInteraction = async (token: string, param: string, query: string): Promise<{ok: boolean, status: number}> => {

    try{

        const request = await api.post(`/interaction/like/${param}?action=${query}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}