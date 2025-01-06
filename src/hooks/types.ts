export interface User {
    username: string;
}

export interface LoginForm {
    onSignIn: (username: string, password: string) => Promise<void>;
    loading: boolean;
    error: string;
}