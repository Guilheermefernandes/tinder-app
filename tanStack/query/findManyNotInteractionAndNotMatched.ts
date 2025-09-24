import { useQuery } from "@tanstack/react-query";
import { interaction } from "../../requests/interaction/findMany";

export const useQueryFindManyNotInteractionAndNotMatched = (token: string) => useQuery({
    queryKey: ['interaction'],
    queryFn: () => interaction(token)
}) 