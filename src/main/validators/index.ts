import { Request, Response } from "express";

export interface Validate {
	validate(request: Request, response: Response): void;
}

export * from "./todo/create-todo-input";
export * from "./todo/todo-id-param";
export * from "./todo/update-todo-input";
