import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "./todo";

@Entity("comments")
export class Comment {
	@PrimaryGeneratedColumn({ name: "comment_id" })
	commentId: number;

	@Column({ name: "user_name" })
	userName: string;

	@Column({ name: "user_photo" })
	userPhoto?: string;

	@Column({ name: "comment" })
	comment: string;

	@Column({ name: "created_at" })
	createdAt: string;

	@Column({ name: "todo_id" })
	todoId: number;

	@ManyToOne(() => Todo, (todo) => todo.comments)
	todo: Todo;
}
