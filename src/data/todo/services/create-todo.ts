import { EntityAlreadyExistsError } from "@/data/common/errors";
import { CreateTodo, TodoEntity, TodoRepository } from "@/domain";

export class CreateTodoService implements CreateTodo {
	constructor(private readonly todoRepository: TodoRepository) {}

	async run(todo: TodoEntity) {
		const hasTodos = await this.todoRepository.findTodos({
			boardIndex: todo.boardIndex,
			boardRef: todo.boardRef,
		});

		if (hasTodos.length > 0) {
			throw new EntityAlreadyExistsError(TodoEntity);
		}

		return this.todoRepository.createTodo(todo);
	}
}
