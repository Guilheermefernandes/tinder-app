import { Register } from "../../types/register"
import { User } from "../../types/user"
import { api } from "../api"

export const interaction = async (token: string): Promise<User[]> => {

    try{

        const request = await api.get('/interaction', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}