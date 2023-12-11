export interface User {
    name: string;
    email: string;
    likes: number;
    recipes: number;
    tips: number;
    image?: string;
    id: string | null;
    token?: string | null;
}
