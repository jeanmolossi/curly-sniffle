import { HttpCode } from "@/data/http-errors/http-codes";
import { HttpError } from "@/data/http-errors/http-error";

type ValidationError = {
	field: string;
	errors: string[];
};

export class ValidationErrors extends HttpError {
	public readonly message: string;
	public readonly errors: Map<string, string[]> = new Map([]);

	constructor() {
		super(HttpCode.BAD_REQUEST, "Bad Request");
	}

	public addError(field: string, error: string): void {
		if (this.errors.has(field)) {
			this.errors.get(field)!.push(error);
			return;
		}

		this.errors.set(field, [error]);
	}

	public shouldThrownError(): boolean {
		this.toJSON();
		return this.errors.size > 0;
	}

	private toJSON() {
		this.metadata = Array.from(this.errors.entries()).map(
			([field, errors]) => ({
				field,
				errors,
			})
		);
	}
}
