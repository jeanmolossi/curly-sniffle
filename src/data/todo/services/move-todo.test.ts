import "reflect-metadata";
import { MockTodoRepository } from "@__tests__/mocks/data/todo/repository.mock";
import { mockTodoEntity } from "@__tests__/mocks/domain/todo-entity.mock";
import { MoveTodoService } from "./move-todo";
import { NotFoundError } from "@/data/common/errors";

const makeSut = () => {
	const repository = new MockTodoRepository();
	const sut = new MoveTodoService(repository);

	const todo = mockTodoEntity();

	return {
		repository,
		sut,
		todo,
	};
};

describe("MoveTodoService", () => {
	it("should move todo", async () => {
		const { sut, todo } = makeSut();

		todo.boardIndex = 1;
		todo.boardRef = "board-1";

		expect(todo.boardIndex).toBe(1);
		expect(todo.boardRef).toBe("board-1");

		const result = await sut.run(todo.todoId, {
			boardIndex: 2,
			boardRef: "board-2",
		});

		expect(result.boardIndex).toBe(2);
		expect(result.boardRef).toBe("board-2");
	});

	it("should throw an error if todo does not exists", async () => {
		const { repository, sut, todo } = makeSut();

		const { todoId } = todo;

		jest.spyOn(repository, "updateTodo").mockRejectedValue(
			new NotFoundError({ todoId })
		);

		await expect(
			sut.run(todo.todoId, { boardIndex: 1, boardRef: "ref" })
		).rejects.toThrowError();
	});
});
