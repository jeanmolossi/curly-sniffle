import { MoveTodo, TodoEntity, TodoMovement, TodoRepository } from "@/domain";

export class MoveTodoService implements MoveTodo {
	constructor(private readonly todoRepository: TodoRepository) {}

	async run(todoId: number, newPosition: TodoMovement): Promise<TodoEntity> {
		return this.todoRepository.updateTodo(
			todoId,
			this.passNewPosition(newPosition)
		);
	}

	private passNewPosition(newPosition: TodoMovement) {
		return (todo: TodoEntity): TodoEntity => {
			todo.boardIndex = newPosition.boardIndex;
			todo.boardRef = newPosition.boardRef;

			return todo;
		};
	}
}
