import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../../requests/post/create";

export const useMutationCreatePost = () => useMutation({
    mutationFn: (data: { auth: string, file: FormData }) => createPost(data.auth, data.file)
})