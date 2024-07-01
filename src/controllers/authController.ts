import { Request, Response } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import { errorResponse, successResponse } from "../helpers";


export class AuthController {

    register = async (req: Request, res: Response) => {
        try {
            return successResponse(req, res, {}, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, 500, error);
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            return successResponse(req, res, {}, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, 500, error);
        }
    }

    googleLogin = async (req: Request, res: Response) => {
        try {
            passport.authenticate('google', { scope: ['profile', 'email'] });
            return successResponse(req, res, {}, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, 500, error);
        }
    }

    googleLoginCallback = passport.authenticate('google', { failureRedirect: '/' });
    

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

            // Send token in the response or set a cookie
            res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
                    
            return successResponse(req, res, token, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, 500, error);
        }
    }

    forgotPassword = async (req: Request, res: Response) => {
        try {
            return successResponse(req, res, {}, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, 500, error);
        }
    }

    resetPassword = async (req: Request, res: Response) => {
        try {
            return successResponse(req, res, {}, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, 500, error);
        }
    }
    
}