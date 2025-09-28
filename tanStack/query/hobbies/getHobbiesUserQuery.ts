import { useQuery } from "@tanstack/react-query";
import { getHobbiesUser } from "../../../requests/hobbies/getHobbiesUser";

export const useQueryGetHobbiesUser = (auth: string) => useQuery({
    queryKey: ['hobbies', 'me'],
    queryFn: () => getHobbiesUser(auth)
})