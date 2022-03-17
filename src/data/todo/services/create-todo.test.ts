import "reflect-metadata";
import { MockTodoRepository } from "@__tests__/mocks/data/todo/repository.mock";
import { mockTodoEntity } from "@__tests__/mocks/domain/todo-entity.mock";
import { CreateTodoService } from "./create-todo";

const makeSut = () => {
	const repository = new MockTodoRepository();
	const sut = new CreateTodoService(repository);

	const todo = mockTodoEntity();

	return {
		repository,
		sut,
		todo,
	};
};

describe("CreateTodoService", () => {
	it("should create todo", async () => {
		const { repository, sut, todo } = makeSut();

		jest.spyOn(repository, "findTodos").mockResolvedValue([]);

		expect(await sut.run(todo)).toEqual(todo);
	});

	it("should throw an error if todo already exists", async () => {
		const { repository, sut, todo } = makeSut();

		jest.spyOn(repository, "findTodos").mockResolvedValue([todo]);

		await expect(sut.run(todo)).rejects.toThrowError();
	});
});
