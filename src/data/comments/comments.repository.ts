import { CommentEntity, CommentRepository, UpdateCallback } from "@/domain";
import { getRepository, Repository } from "typeorm";
import { CommentsMapper } from ".";
import { Comment } from "./comments.entity";

export class CommentsRepositoryAdapter implements CommentRepository {
	private repository: Repository<Comment>;

	constructor() {
		this.repository = getRepository(Comment);
	}

	async getComment(commentId: number): Promise<CommentEntity> {
		const comment = await this.repository.findOne(commentId);

		if (!comment) {
			throw new Error("Comment not found");
		}

		return CommentsMapper.toDomain(comment);
	}

	async getComments(todoId: number): Promise<CommentEntity[]> {
		return CommentsMapper.toDomainArray(
			await this.repository.find({ where: { todoId } })
		);
	}

	async findComments(
		conditions: Partial<CommentEntity>
	): Promise<CommentEntity[]> {
		return CommentsMapper.toDomainArray(
			await this.repository.find({ where: conditions })
		);
	}

	async createComment(comment: CommentEntity): Promise<CommentEntity> {
		return CommentsMapper.toDomain(
			await this.repository.save(CommentsMapper.toPersistence(comment))
		);
	}

	async updateComment(
		commentId: number,
		callback: UpdateCallback<CommentEntity>
	): Promise<CommentEntity> {
		const comment = await this.getComment(commentId);

		if (!comment) {
			throw new Error("Comment not found");
		}

		const updatedComment = callback(comment);

		return CommentsMapper.toDomain(
			await this.repository.save(
				CommentsMapper.toPersistence(updatedComment)
			)
		);
	}

	async deleteComment(commentId: number): Promise<void> {
		await this.repository.delete(commentId);
	}
}
