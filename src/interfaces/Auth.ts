export interface GoogleProfile {
    id: string;
    emails?: { value: string }[];
}

export interface JwtPayload {
    id: string;
    email: string;
}
  