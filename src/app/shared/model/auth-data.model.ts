import { Role } from "./enums";

export interface AuthData {
    token?: string;
    name?: string;
    userName?: string;
    role?: Role;
}
