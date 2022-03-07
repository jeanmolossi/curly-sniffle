import { TodoEntity } from "@/domain/todo/entity";

export interface CreateTodo {
	run(todo: TodoEntity): Promise<TodoEntity>;
}

export interface GetTodo {
	run(todoId: number): Promise<TodoEntity>;
}

export interface GetTodos {
	run(): Promise<TodoEntity[]>;
}

export type TodoMovement = Pick<TodoEntity, "boardIndex" | "boardRef">;

export interface MoveTodo {
	run(todoId: number, newPosition: TodoMovement): Promise<TodoEntity>;
}

export interface DeleteTodo {
	run(todoId: number): Promise<void>;
}
