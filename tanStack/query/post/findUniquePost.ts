import { useQuery } from "@tanstack/react-query";
import { getPhototById } from "../../../requests/post/findUniquePost";

export const useQueryFindUniquePost = (auth: string, param: string) => useQuery({
    queryKey: ['findUniquePost'],
    queryFn: () => getPhototById(auth, param)
})