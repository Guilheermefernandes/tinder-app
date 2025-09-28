import { useMutation } from "@tanstack/react-query";
import { createHobbieUser } from "../../../requests/hobbies/createHobbieUser";

export const userMutationCreateHobbieUser = () => useMutation({
    mutationFn: (data: {auth: string, data: { hobbieId: string }}) => createHobbieUser(data.auth, data.data)
})