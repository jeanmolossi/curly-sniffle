import { assertValidationError } from "@__tests__/helpers/domain-entity";
import { CommentEntity } from "./entity";

describe("CommentEntity", () => {
	it("should instantiate new CommentEntity", () => {
		const comment = new CommentEntity(
			1,
			"userName",
			"userPhoto",
			"the complete comment",
			new Date().toISOString(),
			1
		);

		expect(comment).toBeDefined();
		expect(comment.commentId).toBe(1);
		expect(comment.userName).toBe("userName");
		expect(comment.userPhoto).toBe("userPhoto");
		expect(comment.comment).toBe("the complete comment");
		expect(comment.createdAt).toBeDefined();
		expect(comment.todoId).toBe(1);
	});

	describe("validate", () => {
		describe("should validate username", () => {
			const userNameTestCases = [
				{
					rule: "required",
					value: "",
					message: "field is required",
				},
				{
					rule: "min length",
					value: "a",
					message: "field must be at least 3 characters",
				},
			];

			userNameTestCases.forEach((testCase) => {
				it(`validate username rule ${testCase.rule}`, () => {
					try {
						const _comment = new CommentEntity(
							1,
							testCase.value,
							"userPhoto",
							"the complete comment",
							new Date().toISOString(),
							1
						);

						expect(_comment).toBeFalsy();
					} catch (e: any) {
						assertValidationError(e, {
							field: "userName",
							messages: [testCase.message],
						});
					}
				});
			});
		});

		describe("should validate comment", () => {
			const commentTestCases = [
				{
					rule: "required",
					value: "",
					message: "field is required",
				},
				{
					rule: "min length",
					value: "a",
					message: "field must be at least 15 characters",
				},
			];

			commentTestCases.forEach((testCase) => {
				it(`validate comment rule ${testCase.rule}`, () => {
					try {
						const _comment = new CommentEntity(
							1,
							"userName",
							"userPhoto",
							testCase.value,
							new Date().toISOString(),
							1
						);

						expect(_comment).toBeFalsy();
					} catch (e: any) {
						assertValidationError(e, {
							field: "comment",
							messages: [testCase.message],
						});
					}
				});
			});
		});

		describe("should validate createdAt", () => {
			const createdAtTestCases = [
				{
					rule: "required",
					value: "",
					message: "field is required",
				},
				{
					rule: "date format",
					value: "invalid-date-string",
					message: "field should be a valid date",
				},
			];

			createdAtTestCases.forEach((testCase) => {
				it(`validate createdAt rule ${testCase.rule}`, () => {
					try {
						const _comment = new CommentEntity(
							1,
							"userName",
							"userPhoto",
							"the complete comment",
							testCase.value,
							1
						);

						expect(_comment).toBeFalsy();
					} catch (e: any) {
						assertValidationError(e, {
							field: "createdAt",
							messages: [testCase.message],
						});
					}
				});
			});
		});

		it("should validate todoId", () => {
			try {
				const _comment = new CommentEntity(
					1,
					"userName",
					"userPhoto",
					"the complete comment",
					new Date().toISOString(),
					undefined as any
				);

				expect(_comment).toBeFalsy();
			} catch (e: any) {
				assertValidationError(e, {
					field: "todoId",
					messages: ["field is required"],
				});
			}
		});
	});
});
