import { GetTodo, TodoEntity, TodoRepository } from "@/domain";

export class GetTodoService implements GetTodo {
	constructor(private readonly repository: TodoRepository) {}

	async run(todoId: number): Promise<TodoEntity> {
		const todo = await this.repository.getTodo(todoId);

		if (!todo) {
			throw new Error("Todo not found");
		}

		return todo;
	}
}
