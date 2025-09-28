import { Register } from "../../types/register"
import { AlterPassword } from "../../types/typeAlterPassword"
import { UpdateUser, User } from "../../types/user"
import { api } from "../api"

export const updateUser = async (auth: string, data: UpdateUser): Promise<{ ok: boolean, status: 200 }> => {

    try{

        const request = await api.put('/user/update', data, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })

        return request.data

    }catch(e){

        throw new Error('Ocorreu um erro com a requisição')

    }
}