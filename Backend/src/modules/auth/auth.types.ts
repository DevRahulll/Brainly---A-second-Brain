export interface IUser {
    fullName: string;
    email: string;
    password?: string;
    role: "user" | "admin";

    comparePassword(password: string): Promise<boolean>;
}

export interface IRegisterInput {
    fullName: string;
    email: string;
    password: string;
    role?: "user" | "admin";
}

export interface ILoginInput {
    email: string;
    password: string;
}

export interface IJwtPayload {
    id: string;
}
