import { TodoEntity } from "./entity";

export type UpdateCallback = (todo: TodoEntity) => TodoEntity;

export interface TodoRepository {
	getTodos(): Promise<TodoEntity[]>;
	getTodo(todoId: number): Promise<TodoEntity>;
	findTodos(conditions: Partial<TodoEntity>): Promise<TodoEntity[]>;
	createTodo(todo: TodoEntity): Promise<TodoEntity>;
	updateTodo(todoId: number, callback: UpdateCallback): Promise<TodoEntity>;
	deleteTodo(todoId: number): Promise<void>;
}
