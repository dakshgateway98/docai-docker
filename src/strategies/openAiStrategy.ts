import { AIStrategy } from "../interfaces/AiStrategy";

export class OpenAIStrategy implements AIStrategy{
    generateResponse(prompt: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}