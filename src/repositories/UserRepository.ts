import { Repository } from "typeorm";
import { IUserRepositoryInterface } from "../interfaces/User";
import { Role } from "../models/Role";
import { User } from "../models/User";
import { Database } from "../configs/Database";

class UserRepository implements IUserRepositoryInterface {

    private userRepository: Repository<User>;
    private roleRepository: Repository<Role>;
    constructor(){
        this.userRepository = Database.getInstance().getRepository(User);
        this.roleRepository = Database.getInstance().getRepository(Role);
    }
    
    createUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }
    findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({where: {email}});
    }
    getRoleByName(name: string): Promise<Role | null> {
        return this.roleRepository.findOne({where:{name}});
    }
    findById(id: string) : Promise<User | null> {
        return this.userRepository.findOne({where:{id}});
    }
    updateUser(user: User) : Promise<User> {
        return this.userRepository.save(user);
    }
}

export default UserRepository;
