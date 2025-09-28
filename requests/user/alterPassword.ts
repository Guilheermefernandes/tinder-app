import { Register } from "../../types/register"
import { AlterPassword } from "../../types/typeAlterPassword"
import { User } from "../../types/user"
import { api } from "../api"

export const alterPassword = async (auth: string, data: AlterPassword): Promise<{ ok: boolean }> => {

    try{

        const request = await api.put('/user/alter/password', data, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}