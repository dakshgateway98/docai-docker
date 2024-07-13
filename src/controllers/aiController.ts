import { Request, Response } from "express";
import { AppError, errorResponse, successResponse } from "../helpers";
import { AISTRATEGY, ERROR_CODE } from "../helpers/constants";
import { AIService, createAIService } from "../services/AIService";

export class AiController {

    private aiService;
    constructor() {
        this.aiService = createAIService(AISTRATEGY.DEFAULT_STRATEGY);
    }

    generateResponse = async (req: Request, res: Response) => {
        try {
            const { prompt } = req.body;
            const files = req.files as Express.Multer.File[];

            if (!prompt || !files.length) {
                throw new AppError('Prompt and images are required', ERROR_CODE.NOT_FOUND);
            }

            const imageDetails = files.map(file => ({
                path: file.path,
                mimetype: file.mimetype,
            }));
            
            const response = await this.aiService.generateResponse(prompt, imageDetails);
            return successResponse(req, res, response, 200);

        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
    }
}