import { Role } from "../models/Role";
import { User } from "../models/User";

export interface IUser {
    id : string;
    fullName : string;
    email : string;
    password : string;
    addedOn : Date;
    googleId : string;
    roleId : string;
}
export interface IUserRepositoryInterface {
    createUser(user : User) : Promise<User>;
    findByEmail(email : string) : Promise<User | null>;
    getRoleByName(name : string) : Promise<Role | null>;
    findById(id: string) : Promise<User | null>;
    updateUser(user : User) : Promise<User>;
}