
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface LoginUserInput {
    username: string;
    password: string;
}

export interface User {
    id: number;
    username: string;
}

export interface LoginResponse {
    access_token: string;
    user: User;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
    user(username: string): User | Promise<User>;
}

export interface IMutation {
    login(loginUserInput: LoginUserInput): LoginResponse | Promise<LoginResponse>;
    signup(loginUserInput: LoginUserInput): User | Promise<User>;
}

type Nullable<T> = T | null;
