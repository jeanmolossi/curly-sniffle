import { CommentEntity, CommentRepository, GetComments } from "@/domain";

export class GetCommentsService implements GetComments {
	constructor(private readonly repository: CommentRepository) {}

	async run(todoId: number): Promise<CommentEntity[]> {
		return this.repository.getComments(todoId);
	}
}
