
export interface SurveyUser {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    salt: string; 
    hashedPassword: string;
    role: number;
    openGameId: Number;
}