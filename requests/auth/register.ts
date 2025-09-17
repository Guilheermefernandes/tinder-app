import { Register } from "../../types/register"
import { User } from "../../types/user"
import { api } from "../api"

export const register = async (data: Register): Promise<{token: string}> => {

    try{

        const request = await api.post('/auth/register', data)

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}