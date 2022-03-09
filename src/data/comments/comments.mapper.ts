import { CommentEntity } from "@/domain";
import { Comment } from "./comments.entity";

export class CommentsMapper {
	static toDomain(comment: Comment): CommentEntity {
		return new CommentEntity(
			comment.commentId,
			comment.userName,
			comment.userPhoto,
			comment.comment,
			comment.createdAt,
			comment.todoId
		);
	}

	static toDomainArray(comments: Comment[]): CommentEntity[] {
		return comments?.map(CommentsMapper.toDomain);
	}

	static toPersistence(comment: CommentEntity): Comment {
		return Object.assign(new Comment(), comment);
	}

	static toPersistenceArray(comments: CommentEntity[]): Comment[] {
		return comments?.map(CommentsMapper.toPersistence);
	}
}
