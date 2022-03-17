import "reflect-metadata";
import { Repository } from "typeorm";
import { mockDeep } from "jest-mock-extended";
import { mockTodoEntity } from "@__tests__/mocks/domain/todo-entity.mock";
import { TodoRepositoryAdapter } from "./todo.repository";
import { Todo } from "./todo.entity";
import { TodoMapper } from "./todo.mapper";

const mockRepository = mockDeep<Repository<Todo>>();
jest.mock("typeorm", () => {
	return {
		...jest.requireActual("typeorm"),
		getRepository: () => mockRepository,
	};
});

const makeSut = () => {
	const todo = mockTodoEntity();
	const sut = new TodoRepositoryAdapter();

	// Defaults
	mockRepository.findOne.mockResolvedValue(TodoMapper.toPersistence(todo));
	mockRepository.save.mockResolvedValue(TodoMapper.toPersistence(todo));
	mockRepository.find.mockResolvedValue([TodoMapper.toPersistence(todo)]);

	return {
		sut,
		todo,
	};
};

describe("TodoRepository", () => {
	describe("createTodo", () => {
		it("should create an todo", async () => {
			const { todo, sut } = makeSut();

			const result = await sut.createTodo(todo);

			expect(result).toEqual(todo);
		});
	});

	describe("updateTodo", () => {
		it("should update an todo", async () => {
			const { sut, todo } = makeSut();

			const todoBeforeUpdate = Object.assign({}, todo);
			todo.author = "author-edited";

			mockRepository.save.mockResolvedValue(
				TodoMapper.toPersistence(todo)
			);

			const result = await sut.updateTodo(todo.todoId, (t) => {
				t.author = todo.author;
				return t;
			});

			expect(result).toEqual(todo);
			expect(result.author).toBe("author-edited");
			expect(todoBeforeUpdate.author).not.toBe("author-edited");
			expect(result.author).not.toBe(todoBeforeUpdate.author);
		});

		it("should throw error if todo does not exists", async () => {
			const { sut, todo } = makeSut();

			mockRepository.findOne.mockResolvedValue(undefined);

			await expect(
				sut.updateTodo(todo.todoId, (t) => {
					t.author = todo.author;
					return t;
				})
			).rejects.toThrowError();
		});
	});

	describe("deleteTodo", () => {
		it("should delete an todo", async () => {
			const { todo, sut } = makeSut();

			mockRepository.delete.mockResolvedValue({} as any);

			await sut.deleteTodo(todo.todoId);

			expect(mockRepository.delete).toHaveBeenCalledWith(todo.todoId);
		});
	});

	describe("findTodo", () => {
		it("should find an todo", async () => {
			const { todo, sut } = makeSut();

			expect(await sut.findTodos({ todoId: todo.todoId })).toEqual([
				todo,
			]);
		});
	});

	describe("getTodo", () => {
		it("should get an todo", async () => {
			const { sut, todo } = makeSut();

			expect(await sut.getTodo(todo.todoId)).toEqual(todo);
		});

		it("should return undefined todo does not exists", async () => {
			const { sut, todo } = makeSut();

			mockRepository.findOne.mockResolvedValue(undefined);

			expect(await sut.getTodo(todo.todoId)).toBeUndefined();
		});
	});

	describe("getTodos", () => {
		it("should get all todos", async () => {
			const { sut, todo } = makeSut();

			expect(await sut.getTodos()).toEqual([todo]);
		});
	});
});
