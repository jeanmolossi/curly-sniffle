import { TodoEntity } from "@/domain";
import { CategoryMapper } from "../categories/categories.mapper";
import { Todo } from "./todo.entity";

export class TodoMapper {
	static toDomain(todo: Todo): TodoEntity {
		return new TodoEntity(
			todo.todoId,
			todo.title,
			todo.description,
			todo.author,
			todo.boardIndex,
			todo.boardRef,
			CategoryMapper.arrayToDomain(todo.categories)
			// TODO: Mapper de comments
			// todo.comments
		);
	}

	static arrayToDomain(todos: Todo[]): TodoEntity[] {
		return todos?.map(TodoMapper.toDomain);
	}

	static toPersistence(todo: TodoEntity): Todo {
		return Object.assign(new Todo(), todo);
	}

	static arrayToPersistence(todos: TodoEntity[]): Todo[] {
		return todos?.map(TodoMapper.toPersistence);
	}
}
