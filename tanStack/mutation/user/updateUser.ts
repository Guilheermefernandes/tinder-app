import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../requests/user/updateUser";
import { UpdateUser } from "../../../types/user";

export const useMutationUpdateUser = () => useMutation({
    mutationFn: (data: {auth: string, data: UpdateUser}) => updateUser(data.auth, data.data)
})