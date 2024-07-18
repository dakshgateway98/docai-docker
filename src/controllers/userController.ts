import { Request, Response } from "express";
import { AppError, errorResponse, successResponse } from "../helpers";
import UserRepository from "../repositories/UserRepository";
import UserService from "../services/UserService";
import { ERROR_CODE, ERROR_MESSAGE } from "../helpers/constants";

export class UserController {

    private userService : UserService;
    constructor() {
        const userRepository = new UserRepository();
        this.userService = new UserService(userRepository);
    }

    userProfile = async (req: Request, res: Response) => {
        try {
            if(!req.user){
                throw new AppError(ERROR_MESSAGE.ACCESS_DENIED, ERROR_CODE.UNAUTHORIZED)
            }
            const user = await this.userService.getProfile(req.user.email as string);
            return successResponse(req, res, user, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
    }
}