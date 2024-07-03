import { Request, Response } from 'express';

export const successResponse = (req : Request, res : Response, data : any, code = 200) => res.send({
    code,
    data,
    success: true,
  });
  
  export const errorResponse = (
    req : Request,
    res : Response,
    errorMessage = 'Something went wrong',
    code = 500,
    error : any = {},
  ) => res.status(code).json({
    code,
    errorMessage,
    error: {
      message: error.message,
      status: error.status,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined // Show stack trace only in development
  },
    data: null,
    success: false,
  });
  
  export const uniqueId = (length = 13) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  
  export class AppError extends Error{
    status:number;
    constructor(message:string,status:number){
      super(message);  
      this.status=status;
      Object.setPrototypeOf(this, AppError.prototype);
    }
  }