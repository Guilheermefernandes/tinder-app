import { useMutation } from "@tanstack/react-query";
import { deslike } from "../../../requests/like/deslike";

export const useMutationDeslike = () => useMutation({
    mutationFn: (data: {likeId: string, auth: string}) => deslike(data.likeId, data.auth)
})