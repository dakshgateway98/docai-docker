import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { IUser, IUserRepositoryInterface } from "../interfaces/User";
import { User } from "../models/User";
import { SaveOptions, RemoveOptions } from 'typeorm';
import { AppError } from '../helpers';
import { ERROR_CODE, ERROR_MESSAGE, ROLES } from '../helpers/constants';

class AuthService {
    private _userRepository: IUserRepositoryInterface;
    
    constructor(_userRepository: IUserRepositoryInterface) {
        this._userRepository = _userRepository;
    }

    async createUser(user: IUser): Promise<User> {

        const existingUser = await this._userRepository.findByEmail(user.email);
        if(existingUser){
            throw new AppError(ERROR_MESSAGE.USER_ALREADY_EXIST, ERROR_CODE.CONFLICT)
        }

        const role = await this._userRepository.getRoleByName(ROLES.PATIENT);
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = new User();
        newUser.id = uuidv4();
        newUser.fullName = user.fullName;
        newUser.email = user.email;
        newUser.addedOn = new Date();
        newUser.roleId = role ? role?.id : '';
        newUser.password = hashedPassword;
        newUser.googleId = user.googleId || '';

        return this._userRepository.createUser(newUser);
    }


}

export default AuthService;