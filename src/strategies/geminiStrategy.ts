import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { AIStrategy } from "../interfaces/AiStrategy";
import { AISTRATEGY } from "../helpers/constants";
import fs from 'fs';

export class GeminiStrategy implements AIStrategy{

    private client : GoogleGenerativeAI;
    private genAIModel : GenerativeModel;

    constructor(){
        const geminiAppKey = process.env.GEMINI_APP_KEY || '';
        console.log('GEMINI App Key: ' + geminiAppKey);
        this.client = new GoogleGenerativeAI(geminiAppKey);
        this.genAIModel = this.client.getGenerativeModel({ model: AISTRATEGY.GEMINI_MODEL});
    }

    async generateResponse(prompt: string, images : any[]): Promise<string> {
        let imageParts : any[] = [];
        images.forEach(element => {
            imageParts.push(this.fileToGenerativePart(element.path, element.mimetype));
        });
        
        const result = await this.genAIModel.generateContent([prompt, ...imageParts]);
        const response = result.response;
        const text = response.text();

        return text;
    }

    private fileToGenerativePart(path : string, mimeType: string) {
        return {
          inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType
          },
        };
    }
}