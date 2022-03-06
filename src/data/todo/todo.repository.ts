import { getRepository, Repository } from "typeorm";
import { TodoEntity, TodoRepository, UpdateCallback } from "@/domain";
import { Todo } from "./todo.entity";
import { TodoMapper } from "./todo.mapper";

export class TodoRepositoryAdapter implements TodoRepository {
	private readonly repository: Repository<Todo>;

	constructor() {
		this.repository = getRepository(Todo);
	}

	async getTodos(): Promise<TodoEntity[]> {
		const dbTodos = await this.repository.find();
		return TodoMapper.arrayToDomain(dbTodos);
	}

	async getTodo(todoId: number): Promise<TodoEntity> {
		const dbTodo = await this.repository.findOne(todoId);

		if (!dbTodo) {
			throw new Error("Todo not found");
		}

		return TodoMapper.toDomain(dbTodo);
	}

	async findTodos(conditions: Partial<TodoEntity>): Promise<TodoEntity[]> {
		const dbTodos = await this.repository.find({
			where: conditions,
		});

		return TodoMapper.arrayToDomain(dbTodos);
	}

	async createTodo(todo: TodoEntity): Promise<TodoEntity> {
		const dbTodo = await this.repository.save(
			TodoMapper.toPersistence(todo)
		);

		return TodoMapper.toDomain(dbTodo);
	}

	async updateTodo(
		todoId: number,
		callback: UpdateCallback
	): Promise<TodoEntity> {
		const dbTodo = await this.repository.findOne(todoId);

		if (!dbTodo) {
			throw new Error("Todo not found");
		}

		callback(TodoMapper.toDomain(dbTodo));

		const updatedTodo = await this.repository.save(dbTodo);

		return TodoMapper.toDomain(updatedTodo);
	}
}
