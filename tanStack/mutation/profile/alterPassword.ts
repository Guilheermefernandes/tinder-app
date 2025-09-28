import { useMutation } from "@tanstack/react-query";
import { alterPassword } from "../../../requests/user/alterPassword";
import { AlterPassword } from "../../../types/typeAlterPassword";

export const useMutationAlterPassword = () => useMutation({
    mutationFn: (data: { auth: string, data: AlterPassword }) => alterPassword(data.auth, data.data)
})