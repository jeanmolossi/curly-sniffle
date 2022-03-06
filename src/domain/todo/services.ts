import { TodoEntity } from "@/domain/todo/entity";

export interface CreateTodo {
	run(todo: TodoEntity): Promise<TodoEntity>;
}
