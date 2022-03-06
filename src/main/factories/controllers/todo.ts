import { CreateTodoService } from "@/data/services";
import { TodoRepositoryAdapter } from "@/data/todo";
import { TodoController } from "@/main/controllers/todo";

export function todoControllerFactory() {
	const todoRepository = new TodoRepositoryAdapter();
	const createTodoService = new CreateTodoService(todoRepository);
	return new TodoController(createTodoService);
}
