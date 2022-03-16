import "reflect-metadata";
import { assertValidationError } from "@__tests__/helpers/domain-entity";
import { TodoEntity } from "@/domain";

describe("TodoEntity", () => {
	it("should create TodoEntity instance", () => {
		const todo = new TodoEntity(
			1,
			"title",
			"description",
			"author",
			1,
			"boardRef"
		);

		expect(todo.todoId).toBe(1);
		expect(todo.title).toBe("title");
		expect(todo.description).toBe("description");
		expect(todo.author).toBe("author");
		expect(todo.boardIndex).toBe(1);
		expect(todo.boardRef).toBe("boardRef");
	});

	describe("validate", () => {
		it("should validate field title", () => {
			try {
				const _todo = new TodoEntity(
					1,
					undefined as any,
					"description",
					"author",
					1,
					"boardRef"
				);

				expect(_todo).toBeFalsy();
			} catch (err: any) {
				assertValidationError(err, {
					field: "title",
					messages: ["field is required"],
				});
			}
		});

		it("should validate field description", () => {
			try {
				const _todo = new TodoEntity(
					1,
					"title",
					undefined as any,
					"author",
					1,
					"boardRef"
				);

				expect(_todo).toBeFalsy();
			} catch (e: any) {
				assertValidationError(e, {
					field: "description",
					messages: ["field is required"],
				});
			}
		});

		it("should validate field description length", () => {
			try {
				const _todo = new TodoEntity(
					1,
					"title",
					"a",
					"author",
					1,
					"boardRef"
				);

				expect(_todo).toBeFalsy();
			} catch (e: any) {
				assertValidationError(e, {
					field: "description",
					messages: ["field must be at least 2 characters"],
				});
			}
		});

		it("should validate field author", () => {
			try {
				const _todo = new TodoEntity(
					1,
					"title",
					"description",
					undefined as any,
					1,
					"boardRef"
				);

				expect(_todo).toBeFalsy();
			} catch (e: any) {
				assertValidationError(e, {
					field: "author",
					messages: ["field is required"],
				});
			}
		});

		it("should validate field boardRef", () => {
			try {
				const _todo = new TodoEntity(
					1,
					"title",
					"description",
					"author",
					1,
					""
				);

				expect(_todo).toBeFalsy();
			} catch (e: any) {
				assertValidationError(e, {
					field: "boardRef",
					messages: ["field is required"],
				});
			}
		});
	});
});
