import {User} from "./user";

export const userEqualityPredicate = (username: string) => (user: User) => user.username === username
