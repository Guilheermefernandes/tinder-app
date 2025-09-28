import { User } from "./user";

export interface Interaction {
    id: string;
    from_user_id: string;
    to_user_id: string;
    action: 'LIKE' | 'DELIKE';
    from_user: User
    ro_user: User

}