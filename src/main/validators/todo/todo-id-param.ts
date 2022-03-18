import { Request, Response } from "express";
import { HttpError } from "@/data/http-errors/http-error";
import { Validate } from "../";

class TodoIdParamValidator implements Validate {
	validate(request: Request): void {
		if (!request.params?.id) {
			throw new HttpError(400, "Missing id param");
		}

		const todoId: number = +request.params?.id;
		if (isNaN(todoId)) {
			throw new HttpError(400, "Invalid id param");
		}
	}
}

export const todoIdParamValidator = new TodoIdParamValidator();
