import { Request, Response } from "express";

export class TodoController {
	get(request: Request, response: Response): Response {
		const id = request.params?.id;

		if (id) {
			return response.json(this.getTodo(+id));
		}

		return response.json(this.getTodos());
	}

	getTodos() {
		return [];
	}

	getTodo(id: number) {
		return {
			mock: "OK",
		};
	}
}
