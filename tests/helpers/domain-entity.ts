import { ValidationErrors } from "@/domain/common";

type AssertValidationError = { field: string; messages: string[] };
export function assertValidationError(
	e: ValidationErrors,
	{ field, messages }: AssertValidationError
) {
	expect(e).toBeInstanceOf(ValidationErrors);
	expect(e.message).toBe("Bad Request");
	expect(e.errors.has(field)).toBeTruthy();

	messages.forEach((message) =>
		expect(e.errors.get(field)).toContain(message)
	);
}
