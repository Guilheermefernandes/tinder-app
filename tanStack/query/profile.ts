import { useQuery } from "@tanstack/react-query";
import { profile } from "../../requests/user/findUnique";

export const useQueryProfile = (auth: string) => useQuery({
    queryKey: ['profile'],
    queryFn: () => profile(auth)
})