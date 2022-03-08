import { UpdateCallback } from "@/domain";
import { TodoEntity } from "./entity";

export interface TodoRepository {
	getTodos(): Promise<TodoEntity[]>;
	getTodo(todoId: number): Promise<TodoEntity>;
	findTodos(conditions: Partial<TodoEntity>): Promise<TodoEntity[]>;
	createTodo(todo: TodoEntity): Promise<TodoEntity>;
	updateTodo(
		todoId: number,
		callback: UpdateCallback<TodoEntity>
	): Promise<TodoEntity>;
	deleteTodo(todoId: number): Promise<void>;
}
