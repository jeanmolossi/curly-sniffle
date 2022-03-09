import { UpdateCallback } from "..";
import { CommentEntity } from "./entity";

export interface CommentRepository {
	getComment(postId: number): Promise<CommentEntity>;
	getComments(todoId: number): Promise<CommentEntity[]>;
	findComments(conditions: Partial<CommentEntity>): Promise<CommentEntity[]>;
	createComment(comment: CommentEntity): Promise<CommentEntity>;
	updateComment(
		commentId: number,
		callback: UpdateCallback<CommentEntity>
	): Promise<CommentEntity>;
	deleteComment(postId: number): Promise<void>;
}
