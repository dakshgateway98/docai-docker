import { AppError } from "../helpers";
import { ERROR_CODE } from "../helpers/constants";
import { AIStrategy } from "../interfaces/AiStrategy";
import { GeminiStrategy } from "../strategies/geminiStrategy";
import { OpenAIStrategy } from "../strategies/openAiStrategy";

export class AIService {
    private strategy : AIStrategy;
    constructor(strategy: AIStrategy) {
        this.strategy = strategy;
    }

    async generateResponse(prompt: string, images : any[]): Promise<string> {
        return this.strategy.generateResponse(prompt, images);
    }
}

export const createAIService = (name : string) : AIStrategy => {
    let strategy: AIStrategy;

    switch (name) {
        case 'gemini': 
            strategy = new GeminiStrategy();
            break;
        
        case 'openai':
            strategy = new OpenAIStrategy();
            break;
        
        default:
            throw new AppError(`Unsupported name: ${name}`, ERROR_CODE.NOT_FOUND);
    }

    return new AIService(strategy);
}   