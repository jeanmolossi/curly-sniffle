import { HttpError } from "@/data/http-errors/http-error";
import { TodoEntity } from "@/domain";
import { ValidationErrors } from "@/domain/common";
import { Request, Response } from "express";
import { Validate } from "../";

type Body = Pick<TodoEntity, "boardIndex" | "boardRef">;

class UpdateTodoValidator implements Validate {
	validate(request: Request<never, any, Body>): void {
		if (!request.body) {
			throw new HttpError(400, "Missing body");
		}

		const { body } = request;

		const validator = new ValidationErrors();

		if (!body.boardRef) {
			validator.addError("board column", "Missing board column");
		}

		if (isNaN(body.boardIndex + 1) || body.boardIndex + 1 < 1) {
			validator.addError(
				"board position",
				"Board position does not identified"
			);
		}

		if (validator.shouldThrownError()) {
			throw validator;
		}
	}
}

export const updateTodoValidator = new UpdateTodoValidator();
