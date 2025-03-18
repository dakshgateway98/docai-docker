import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, IUserRepositoryInterface } from "../interfaces/User";
import { User } from "../models/User";
import { SaveOptions, RemoveOptions } from 'typeorm';
import { AppError } from '../helpers';
import { EMAIL_SUBJECTS, ERROR_CODE, ERROR_MESSAGE, ROLES } from '../helpers/constants';
import mailFunc from '../helpers/sendEmail';

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

        const newUser = new User();
        newUser.id = uuidv4();
        newUser.fullName = user.fullName;
        newUser.email = user.email;
        newUser.addedOn = new Date();
        newUser.roleId = role ? role?.id : '';
        newUser.password = "";
        newUser.googleId = user.googleId || '';
        newUser.isActive = false;

        const createdUser = await this._userRepository.createUser(newUser);

        const resetToken = jwt.sign(
            { id: createdUser.id },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        const resetUrl = `${process.env.FRONTEND_URL}/verify?token=${resetToken}`;
        const emailContent = `<p>Hello ${createdUser.fullName}</p><br /><p>Thank you for choosing DocAI. Click <a href="${resetUrl}">here</a> to verify your account and get started. This link will expire in 1 hour.</p>`;
        await mailFunc(user.email, emailContent, EMAIL_SUBJECTS.ACCOUNT_VERIFY);

        return createdUser;
    }

    async loginUser(email: string, password: string) : Promise<string> {
        const user = await this._userRepository.findByEmail(email);
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new AppError(ERROR_MESSAGE.INVALID_CREDENTIALS, ERROR_CODE.UNAUTHORIZED);
        }

        if(!user.isActive){
            throw new AppError(ERROR_MESSAGE.ACCOUNT_DEACTIVATED, ERROR_CODE.UNAUTHORIZED);
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        return token;
    }

    async handleGoogleCallback(profile : any) : Promise<string> {
        // Add the user to the DB if not exist
        let user = await this._userRepository.findByEmail(profile.emails[0].value);
        if(!user){
            const role = await this._userRepository.getRoleByName(ROLES.PATIENT);
            user = new User();
            user.id = uuidv4();
            user.fullName = profile.displayName;
            user.email = profile.emails[0].value;
            user.addedOn = new Date();
            user.roleId = role ? role.id : '';
            user.googleId = profile.id;
            user.password = ''; 
            user.isActive = true;

            await this._userRepository.createUser(user);
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET!, 
            { expiresIn: '1h',}
        );

        return token;
    }

    async forgotPassword(email: string) : Promise<void> {
        const user = await this._userRepository.findByEmail(email);
        if (!user) {
            throw new AppError(ERROR_MESSAGE.INVALID_CREDENTIALS, ERROR_CODE.NOT_FOUND);
        }

        const resetToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        const resetUrl = `${process.env.FRONTEND_URL}/verify?token=${resetToken}`;
        const emailContent = `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>`;
        await mailFunc(user.email, emailContent, EMAIL_SUBJECTS.PASSWORD_RESET);
        user.isActive = false;
        await this._userRepository.updateUser(user);
    }

    async activateAccount(token: string, newPassword: string) : Promise<void> {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        } catch (error) {
            throw new AppError(ERROR_MESSAGE.INVALID_RESET_TOKEN, ERROR_CODE.UNAUTHORIZED);
        }

        const user = await this._userRepository.findById(decoded.id);
        console.log({user})
        if (!user) {
            throw new AppError(ERROR_MESSAGE.INVALID_CREDENTIALS, ERROR_CODE.NOT_FOUND);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.isActive = true;
        console.log("updated User" , {user})
        await this._userRepository.updateUser(user);
    }
}

export default AuthService;