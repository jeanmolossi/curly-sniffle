import { CommentEntity, CommentRepository, CreateComment } from "@/domain";

export class CreateCommentService implements CreateComment {
	constructor(private readonly repository: CommentRepository) {}

	async run(comment: CommentEntity): Promise<CommentEntity> {
		return this.repository.createComment(comment);
	}
}
