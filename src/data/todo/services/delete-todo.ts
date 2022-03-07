import { DeleteTodo, TodoRepository } from "@/domain";

export class DeleteTodoService implements DeleteTodo {
	constructor(private readonly repository: TodoRepository) {}

	async run(todoId: number): Promise<void> {
		const todoToDelete = await this.repository.getTodo(todoId);

		if (!todoToDelete) {
			throw new Error(`Todo with id ${todoId} not found`);
		}

		await this.repository.deleteTodo(todoId);
	}
}
