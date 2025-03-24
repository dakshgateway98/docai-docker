import { Request, Response } from "express";
import { errorResponse, successResponse } from "../helpers";
import { IUser } from "../interfaces/User";
import AuthService from "../services/AuthService";
import UserRepository from "../repositories/UserRepository";
import { API_RESPONSE_MESSAGE } from "../helpers/constants";

export class AuthController {

    private authService: AuthService;

    constructor() {
        const userRepository = new UserRepository();
        this.authService = new AuthService(userRepository);
    }

    register = async (req: Request, res: Response) => {
        try {
            const payload : IUser = req.body;
            const user = await this.authService.createUser(payload);
            return successResponse(req, res, user, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            
            const token = await this.authService.loginUser(email, password);
            return successResponse(req, res, token, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, error.status || 500, error);
        }
    }

    handleGoogleLoginCallback = async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                return res.redirect('/');
            }

            const token = await this.authService.handleGoogleCallback(req.user);
            res.cookie('jwt', token, { secure: process.env.NODE_ENV === 'production' });
            
            /** Here instead of sending the token through api, we can redirect to the FE URL */
            return res.redirect(`${process.env.FRONTEND_URL}/docai/home`);
            // return successResponse(req, res, token, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
    }

    forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            await this.authService.forgotPassword(email);
            return successResponse(req, res, { message: API_RESPONSE_MESSAGE.SENT_EMAIL }, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
    }

    resetPassword = async (req: Request, res: Response) => {
        try {
            const { token, newPassword } = req.body;
            await this.authService.activateAccount(token, newPassword);
            return successResponse(req, res, { message: API_RESPONSE_MESSAGE.PASSWORD_RESET }, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
    }
    
}