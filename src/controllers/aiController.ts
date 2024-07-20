import { Request, Response } from "express";
import fs from 'fs/promises';
import { AppError, errorResponse, successResponse } from "../helpers";
import { AISTRATEGY, ERROR_CODE, ERROR_MESSAGE, REPORT_TYPES, ReportType } from "../helpers/constants";
import { createAIService } from "../services/AIService";
import { PREDEFINED_PROMPT } from "../helpers/predefinedPrompt";

export class AiController {

    private aiService;
    constructor() {
        this.aiService = createAIService(AISTRATEGY.DEFAULT_STRATEGY);
    }

    generateResponse = async (req: Request, res: Response) => {
        const { prompt:clinicalNotePrompt } = req.body;
        const type = req.body.type as ReportType || REPORT_TYPES.XRAY;
        const finalPrompt = PREDEFINED_PROMPT[type] + clinicalNotePrompt;
        const files = req.files as Express.Multer.File[];
        try {

            if (!clinicalNotePrompt || !files.length) {
                throw new AppError(ERROR_MESSAGE.PROMPT_IMAGE_NOT_FOUND, ERROR_CODE.NOT_FOUND);
            }

            const imageDetails = files.map(file => ({
                path: file.path,
                mimetype: file.mimetype,
            }));
            
            const response = await this.aiService.generateResponse(finalPrompt, imageDetails);
            return successResponse(req, res, response, 200);

        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
        finally {
            await Promise.all(files.map(file => fs.unlink(file.path)));
        }
    }

    getAllOptions = async (req: Request, res: Response) => {
        try {
            const options = Object.values(REPORT_TYPES);
            return successResponse(req, res, options, 200);
        } catch (error : any) {
            return errorResponse(req, res,error.message, error.statusCode || 500, error);
        }
    }
}