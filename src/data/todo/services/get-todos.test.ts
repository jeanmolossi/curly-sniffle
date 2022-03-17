import "reflect-metadata";
import { MockTodoRepository } from "@__tests__/mocks/data/todo/repository.mock";
import { mockTodoEntity } from "@__tests__/mocks/domain/todo-entity.mock";
import { GetTodosService } from "./get-todos";

const makeSut = () => {
	const repository = new MockTodoRepository();
	const sut = new GetTodosService(repository);

	const todo = mockTodoEntity();

	return {
		repository,
		sut,
		todo,
	};
};

describe("GetTodosService", () => {
	it("should get todos", async () => {
		const { repository, sut, todo } = makeSut();

		jest.spyOn(repository, "getTodos").mockResolvedValue([todo]);
		await sut.run();

		expect(repository.getTodos).toHaveBeenCalledTimes(1);
	});

	it("should be undefined if has no todos", async () => {
		const { repository, sut } = makeSut();

		jest.spyOn(repository, "getTodos").mockResolvedValue(undefined as any);

		expect(await sut.run()).toBeUndefined();
	});
});
