import { NotFoundError } from "@/data/common/errors";
import { GetTodo, TodoEntity, TodoRepository } from "@/domain";

export class GetTodoService implements GetTodo {
	constructor(private readonly repository: TodoRepository) {}

	async run(todoId: number): Promise<TodoEntity> {
		const todo = await this.repository.getTodo(todoId);

		if (!todo) {
			throw new NotFoundError({ message: "Todo not found", todoId });
		}

		return todo;
	}
}
