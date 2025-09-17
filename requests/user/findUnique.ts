import { Register } from "../../types/register"
import { User } from "../../types/user"
import { api } from "../api"

export const profile = async (auth: string): Promise<string> => {

    try{

        const request = await api.get('/user', {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}