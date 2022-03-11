import { HttpCode } from "@/data/http-errors/http-codes";
import { HttpError } from "@/data/http-errors/http-error";

export class NotFoundError extends HttpError {
	constructor(metadata?: object) {
		super(HttpCode.NOT_FOUND, "Not found", metadata);
	}
}
