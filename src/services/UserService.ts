import { AppError } from "../helpers";
import { ERROR_CODE, ERROR_MESSAGE } from "../helpers/constants";
import { IUserRepositoryInterface } from "../interfaces/User";
import jwt from 'jsonwebtoken';

class UserService {
    private _userRepository: IUserRepositoryInterface;
    
    constructor(_userRepository: IUserRepositoryInterface) {
        this._userRepository = _userRepository;
    }

    async getProfile(email: string) : Promise<any> {
        const user = await this._userRepository.findByEmail(email);
        if (!user) {
            throw new AppError(ERROR_MESSAGE.INVALID_CREDENTIALS, ERROR_CODE.NOT_FOUND);
        }

        return {name: user.fullName, email: user.email};
    }
}

export default UserService;