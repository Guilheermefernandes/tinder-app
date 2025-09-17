import { useMutation } from "@tanstack/react-query";
import { register } from "../../../requests/auth/register";
import { Register } from "../../../types/register";

export const useMutationRegister = () => useMutation({
    mutationFn: (data: Register) => register(data)
})