import { TodoEntity } from "@/domain";
import { Todo } from "./todo.entity";

export class TodoMapper {
	static toDomain(todo: Todo): TodoEntity {
		return new TodoEntity(
			todo.todoId,
			todo.title,
			todo.description,
			todo.author,
			todo.boardIndex,
			todo.boardRef
			// TODO: Mapper de categories
			// todo.categories,
			// TODO: Mapper de comments
			// todo.comments
		);
	}

	static arrayToDomain(todos: Todo[]): TodoEntity[] {
		return todos.map((todo) => TodoMapper.toDomain(todo));
	}

	static toPersistence(todo: TodoEntity): Todo {
		return Object.assign(new Todo(), todo);
	}

	static arrayToPersistence(todos: TodoEntity[]): Todo[] {
		return todos.map((todo) => TodoMapper.toPersistence(todo));
	}
}
