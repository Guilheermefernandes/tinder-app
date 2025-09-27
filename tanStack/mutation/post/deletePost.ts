import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../../../requests/post/deletePost";

export const useMutationDeletePost = () => useMutation({
    mutationFn: (data: {auth: string, param: string}) => deletePost(data.auth, data.param)
})