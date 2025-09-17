import { Login } from "../../types/login";
import { api } from "../api";

export const login = async (data: Login): Promise<{ token: string }> => {
    try{

        const request = await api.post('/auth/login', data)

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}