import { useQuery } from "@tanstack/react-query";
import { findUserById } from "../../requests/user/findUserById";

export const useQueryFindUserById = (param: string, auth: string) => useQuery({
    queryKey: [param],
    queryFn: () => findUserById(param, auth)
})