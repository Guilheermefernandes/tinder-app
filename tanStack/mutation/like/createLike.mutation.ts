import { useMutation } from "@tanstack/react-query";
import { createLike } from "../../../requests/like/createLike";

export const useMutationCreateLike = () => useMutation({
    mutationFn: (data: {postId: string, auth: string}) => createLike(data.postId, data.auth)
})