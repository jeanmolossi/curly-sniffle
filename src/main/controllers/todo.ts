import { Request, Response } from "express";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, MoveTodo } from "@/domain";
import { Controller, Delete, Get, Post, Put } from "../decorators/controller";

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
	async get(request: Request, response: Response): Promise<Response> {
		const id = request.params?.id;

		if (!id) {
			return response.status(400).json({
				error: "Missing id param",
			});
		}

		const todoId: number = +id;
		if (isNaN(todoId)) {
			return response.status(400).json({
				error: "Invalid id param",
			});
		}

		const todo = await this.getTodoService.run(todoId);
		return response.json(todo);
	}

	@Get("/")
	async show(_: Request, response: Response) {
		const todos = await this.getTodosService.run();
		return response.json(todos);
	}

	@Post("/")
	async post(request: Request, response: Response): Promise<Response> {
		const { body } = request;

		const todo = await this.createTodoService.run(body);

		return response.json(todo);
	}

	@Put("/:id")
	async put(request: Request, response: Response): Promise<Response> {
		const { body, params } = request;

		if (!params?.id || !body) {
			return response.status(400).json({
				error: "Missing id param",
			});
		}

		const todo = await this.moveTodoService.run(+params.id, body);

		return response.json(todo);
	}

	@Delete("/:id")
	async delete(request: Request, response: Response): Promise<Response> {
		const { params } = request;

		if (!params?.id) {
			return response.status(400).json({
				error: "Missing id param",
			});
		}

		await this.deleteTodoService.run(+params.id);

		return response.status(204).json();
	}
}
