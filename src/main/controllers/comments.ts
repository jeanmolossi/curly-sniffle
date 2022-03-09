import { Request, Response } from "express";
import { CreateComment, DeleteComment } from "@/domain";
import { Controller, Delete, Post } from "../decorators/controller";

@Controller("/todo")
export class CommentsController {
	constructor(
		private readonly createComment: CreateComment,
		private readonly deleteComment: DeleteComment
	) {}

	@Post("/:id/comment")
	async post(request: Request, response: Response): Promise<Response> {
		const { params, body } = request;

		if (!params?.id || !body) {
			return response.status(400).json({
				error: "Missing id param",
			});
		}

		body.todoId = +params.id;
		delete body.id;

		const newComment = await this.createComment.run(body);

		return response.json(newComment);
	}

	@Delete("/:id/comment/:commentId")
	async delete(request: Request, response: Response): Promise<Response> {
		const { params } = request;

		if (!params?.id || !params.commentId) {
			return response.status(400).json({
				error: "Missing id param",
			});
		}

		await this.deleteComment.run(+params.commentId);

		return response.status(204).json();
	}
}
