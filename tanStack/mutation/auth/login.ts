import { useMutation } from "@tanstack/react-query";
import { login } from "../../../requests/auth/login";
import { Login } from "../../../types/login";

export const useMutationLogin = () => useMutation({
    mutationFn: (data: Login) => login(data)
})