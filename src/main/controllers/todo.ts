import { Request, Response } from "express";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, MoveTodo } from "@/domain";
import { Controller, Delete, Get, Post, Put } from "../decorators/controller";
import { ValidateInputWith } from "../decorators/validate-with";
import { createTodoInputValidator, todoIdParamValidator } from "../validators";
import { updateTodoValidator } from "../validators/todo/update-todo-input";

@Controller("/todo")
export class TodoController {
	constructor(
		private readonly createTodoService: CreateTodo,
		private readonly getTodoService: GetTodo,
		private readonly getTodosService: GetTodos,
		private readonly moveTodoService: MoveTodo,
		private readonly deleteTodoService: DeleteTodo
	) {}

	@Get("/:id")
	@ValidateInputWith(todoIdParamValidator)
	async get(request: Request, response: Response): Promise<Response> {
		const todoId: number = +request.params?.id;

		const todo = await this.getTodoService.run(todoId);
		return response.json(todo);
	}

	@Get("/")
	async show(_: Request, response: Response) {
		const todos = await this.getTodosService.run();
		return response.json(todos);
	}

	@Post("/")
	@ValidateInputWith(createTodoInputValidator)
	async post(request: Request, response: Response): Promise<Response> {
		const { body } = request;

		const todo = await this.createTodoService.run(body);

		return response.json(todo);
	}

	@Put("/:id")
	@ValidateInputWith(todoIdParamValidator)
	@ValidateInputWith(updateTodoValidator)
	async put(request: Request, response: Response): Promise<Response> {
		const { body, params } = request;

		const todo = await this.moveTodoService.run(+params.id, body);

		return response.json(todo);
	}

	@Delete("/:id")
	@ValidateInputWith(todoIdParamValidator)
	async delete(request: Request, response: Response): Promise<Response> {
		const { params } = request;

		await this.deleteTodoService.run(+params.id);

		return response.status(204).json();
	}
}
