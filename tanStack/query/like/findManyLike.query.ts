import { useQuery } from "@tanstack/react-query";
import { findManyLike } from "../../../requests/like/findManyLikes";

export const useQueryFindManyLike = (postId: string) => useQuery({
    queryKey: ['likes', postId],
    queryFn: () => findManyLike(postId)
})