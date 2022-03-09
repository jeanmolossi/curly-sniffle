import { CommentEntity } from "./entity";

export interface CreateComment {
	run(comment: CommentEntity): Promise<CommentEntity>;
}

export interface GetComment {
	run(commentId: number): Promise<CommentEntity>;
}

export interface GetComments {
	run(todoId: number): Promise<CommentEntity[]>;
}

export interface UpdateComment {
	run(
		commentId: number,
		comment: Partial<CommentEntity>
	): Promise<CommentEntity>;
}

export interface DeleteComment {
	run(commentId: number): Promise<void>;
}
