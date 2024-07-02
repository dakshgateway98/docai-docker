import { Request, Response } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import { errorResponse, successResponse } from "../helpers";
import { IUser } from "../interfaces/User";
import AuthService from "../services/AuthService";
import UserRepository from "../repositories/UserRepository";


export class AuthController {

    private authService: AuthService;

    constructor() {
        const userRepository = new UserRepository();
        this.authService = new AuthService(userRepository);
    }

    register = async (req: Request, res: Response) => {
        try {
            const payload : IUser = req.body;
            const user = this.authService.createUser(payload);
            return successResponse(req, res, user, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            return successResponse(req, res, {}, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
    }

    handleGoogleLoginCallback = async (req: Request, res: Response) => {
        try {
            console.log('google', req.user)
            if (!req.user) {
                return res.redirect('/');
            }
            const user = req.user as any;
            const token = jwt.sign(
                { id: user.id, email: user.email }, 
                process.env.JWT_SECRET!, 
                { expiresIn: '1h',}
            );

            res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            
            /** Here instead of sending the token through api, we can redirect to the FE URL */
            return successResponse(req, res, token, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
    }

    forgotPassword = async (req: Request, res: Response) => {
        try {
            return successResponse(req, res, {}, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
    }

    resetPassword = async (req: Request, res: Response) => {
        try {
            return successResponse(req, res, {}, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
    }
    
}