import { CommentRepository, DeleteComment } from "@/domain";

export class DeleteCommentService implements DeleteComment {
	constructor(private readonly repository: CommentRepository) {}

	async run(commentId: number): Promise<void> {
		return this.repository.deleteComment(commentId);
	}
}
