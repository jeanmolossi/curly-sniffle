import { GetTodos, TodoEntity, TodoRepository } from "@/domain";

export class GetTodosService implements GetTodos {
	constructor(private readonly repository: TodoRepository) {}

	async run(): Promise<TodoEntity[]> {
		return this.repository.getTodos();
	}
}
