import { Interaction } from "../../types/Interaction"
import { Register } from "../../types/register"
import { User } from "../../types/user"
import { api } from "../api"

export const interactionQueue = async (token: string): Promise<Interaction[]> => {

    try{

        const request = await api.get('/interaction/like', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}