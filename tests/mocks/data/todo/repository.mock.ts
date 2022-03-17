import { TodoRepository, TodoEntity, UpdateCallback } from "@/domain";
import { mockTodoEntity } from "@__tests__/mocks/domain/todo-entity.mock";

export class MockTodoRepository implements TodoRepository {
	getTodos(): Promise<TodoEntity[]> {
		throw new Error("Method not implemented.");
	}

	getTodo(todoId: number): Promise<TodoEntity> {
		throw new Error("Method not implemented.");
	}

	findTodos(conditions: Partial<TodoEntity>): Promise<TodoEntity[]> {
		throw new Error("Method not implemented.");
	}

	createTodo(todo: TodoEntity): Promise<TodoEntity> {
		return Promise.resolve(todo);
	}

	updateTodo(
		todoId: number,
		callback: UpdateCallback<TodoEntity>
	): Promise<TodoEntity> {
		return Promise.resolve(callback(mockTodoEntity({ todoId })));
	}

	deleteTodo(todoId: number): Promise<void> {
		return Promise.resolve();
	}
}
