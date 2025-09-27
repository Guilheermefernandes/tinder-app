import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../../../requests/post/findManyUserPostsById";

export const useQueryGetPostUserById = (auth: string, param: string) => useQuery({
    queryKey: ['posts'],
    queryFn: () => getPostById(auth, param)
})