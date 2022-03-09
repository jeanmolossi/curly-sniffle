import { CommentEntity, CommentRepository, GetComment } from "@/domain";

export class GetCommentService implements GetComment {
	constructor(private readonly repository: CommentRepository) {}

	async run(commentId: number): Promise<CommentEntity> {
		return this.repository.getComment(commentId);
	}
}
