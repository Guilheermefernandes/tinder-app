import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useQueryHome = () => useQuery({
    queryKey: ['home'],
    queryFn: async () => {
        const request = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return request.data
    }
})