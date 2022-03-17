import "reflect-metadata";
import { MockTodoRepository } from "@__tests__/mocks/data/todo/repository.mock";
import { mockTodoEntity } from "@__tests__/mocks/domain/todo-entity.mock";
import { DeleteTodoService } from "./delete-todo";

const makeSut = () => {
	const repository = new MockTodoRepository();
	const sut = new DeleteTodoService(repository);

	const todo = mockTodoEntity();

	return {
		repository,
		sut,
		todo,
	};
};

describe("DeleteTodoService", () => {
	it("should delete todo", async () => {
		const { repository, sut, todo } = makeSut();

		jest.spyOn(repository, "getTodo").mockResolvedValue(todo);
		await sut.run(todo.todoId);

		expect(repository.getTodo).toHaveBeenCalledWith(todo.todoId);
	});

	it("should throw an error if todo does not exists", async () => {
		const { repository, sut, todo } = makeSut();

		jest.spyOn(repository, "getTodo").mockResolvedValue(undefined as any);

		await expect(sut.run(todo.todoId)).rejects.toThrowError();
	});
});
