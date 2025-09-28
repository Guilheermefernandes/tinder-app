import { useMutation } from "@tanstack/react-query";
import { createInteraction } from "../../../requests/interaction/createInteraction";

export const useMutationCreateInteraction = () => useMutation({
    mutationFn: (data: {auth: string, param: string, query: string}) => createInteraction(data.auth, data.param, data.query)
})