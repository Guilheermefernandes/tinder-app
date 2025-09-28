import { useQuery } from "@tanstack/react-query";
import { interactionQueue } from "../../../requests/interaction/findQueue";

export const useQueryFindQueue = (auth: string) => useQuery({
    queryKey: ['like'],
    queryFn: () => interactionQueue(auth)
})