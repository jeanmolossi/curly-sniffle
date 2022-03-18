import { NextFunction, Request, Response } from "express";
import { HttpError } from "@/data/http-errors/http-error";
import { Validate } from "../";
import { TodoEntity } from "@/domain";
import { ValidationErrors } from "@/domain/common";

type Body = TodoEntity;

class CreateTodoInputValidator implements Validate {
	validate(request: Request<never, any, Body>): void {
		if (!request.body) {
			throw new HttpError(400, "You must provide a body");
		}

		const { body } = request;

		const validator = new ValidationErrors();

		if (!body.title) {
			validator.addError("title", "You must provide a title");
		}

		if (!body.author) {
			validator.addError("author", "You must provide an author");
		}

		if (!body.description) {
			validator.addError("description", "You must provide a description");
		}

		if (isNaN(body.boardIndex + 1) || body.boardIndex + 1 < 1) {
			validator.addError(
				"board position",
				"Board position does not identified"
			);
		}

		if (!body.boardRef) {
			validator.addError(
				"board column",
				"Board column does not identified"
			);
		}

		if (validator.shouldThrownError()) {
			throw validator;
		}
	}
}

export const createTodoInputValidator = new CreateTodoInputValidator();
