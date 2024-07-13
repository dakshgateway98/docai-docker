export interface AIStrategy {
    generateResponse(prompt: string, images: any[]): Promise<string>;
}

export interface ImageDetail {
    path: string;
    mimetype: string;
}