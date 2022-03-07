import {
	CreateTodoService,
	DeleteTodoService,
	GetTodoService,
	GetTodosService,
	MoveTodoService,
} from "@/data/todo";
import { TodoRepositoryAdapter } from "@/data/todo";
import { TodoController } from "@/main/controllers/todo";

export function todoControllerFactory() {
	const todoRepository = new TodoRepositoryAdapter();

	const createTodoService = new CreateTodoService(todoRepository);
	const getTodoService = new GetTodoService(todoRepository);
	const getTodosService = new GetTodosService(todoRepository);
	const moveTodoService = new MoveTodoService(todoRepository);
	const deleteTodoService = new DeleteTodoService(todoRepository);

	return new TodoController(
		createTodoService,
		getTodoService,
		getTodosService,
		moveTodoService,
		deleteTodoService
	);
}
