import { useQuery } from "@tanstack/react-query";
import { getHobbies } from "../../../requests/hobbies/findManyHobbies";

export const useHobbies = (auth: string) => useQuery({
    queryKey: ['hobbies'],
    queryFn: () => getHobbies(auth)
})