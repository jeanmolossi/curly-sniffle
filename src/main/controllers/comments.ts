import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "@/data/comments";

export class CommentsController {
	async post(request: Request, response: Response): Promise<Response> {
		const { params, body } = request;

		if (!params?.id || !body) {
			return response.status(400).json({
				error: "Missing id param",
			});
		}

		const commentRepository = getRepository(Comment);

		const comment = commentRepository.create({
			...body,
			todoId: params.id,
		});

		const newComment = await commentRepository.save(comment);

		return response.json(newComment);
	}

	async delete(request: Request, response: Response): Promise<Response> {
		const { params } = request;

		if (!params?.id || !params.commentId) {
			return response.status(400).json({
				error: "Missing id param",
			});
		}

		const commentRepository = getRepository(Comment);
		const comment = await commentRepository.findOne(+params.id);

		if (!comment) {
			return response.status(404).json({
				error: "Comment not found",
			});
		}

		await commentRepository.remove(comment);

		return response.status(204).json();
	}
}
