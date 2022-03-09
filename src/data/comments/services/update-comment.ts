import { CommentEntity, CommentRepository, UpdateComment } from "@/domain";

export class UpdateCommentService implements UpdateComment {
	constructor(private readonly repository: CommentRepository) {}

	async run(
		commentId: number,
		comment: Partial<CommentEntity>
	): Promise<CommentEntity> {
		return this.repository.updateComment(
			commentId,
			this.runCallback(comment)
		);
	}

	private runCallback(dataToUpdate: Partial<CommentEntity>) {
		return (comment: CommentEntity) => {
			return Object.assign(comment, dataToUpdate);
		};
	}
}
