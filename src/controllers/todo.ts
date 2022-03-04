import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Todo } from "@/entities/todo";

export class TodoController {
	async get(request: Request, response: Response): Promise<Response> {
		const id = request.params?.id;

		if (id) {
			const todo = await this.getTodo(+id);
			return response.json(todo);
		}

		const todos = await this.getTodos();
		return response.json(todos);
	}

	async post(request: Request, response: Response): Promise<Response> {
		const { body } = request;

		const todoRepository = getRepository(Todo);

		const todos = await todoRepository.find({
			where: {
				boardIndex: body.boardIndex,
				boardRef: body.boardRef,
			},
		});

		if (todos.length > 0) {
			return response.status(403).json({
				error: "Todo already exists",
			});
		}

		const todo = todoRepository.create(body);

		const savedTodo = await todoRepository.save(todo);
		return response.json(savedTodo);
	}

	async getTodos() {
		const entityManager = getManager();

		return entityManager.find(Todo);
	}

	async getTodo(id: number) {
		const entityManager = getManager();
		return entityManager.findOne(Todo, id);
	}
}
