import { CreateTodo, TodoEntity, TodoRepository } from "@/domain";

export class CreateTodoService implements CreateTodo {
	constructor(private readonly todoRepository: TodoRepository) {}

	async run(todo: TodoEntity) {
		const hasTodos = await this.todoRepository.findTodos({
			boardIndex: todo.boardIndex,
			boardRef: todo.boardRef,
		});

		if (hasTodos.length > 0) {
			throw new Error("Todo already exists");
		}

		return this.todoRepository.createTodo(todo);
	}
}
