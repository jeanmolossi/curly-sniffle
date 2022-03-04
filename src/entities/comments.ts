import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
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

	@CreateDateColumn({ name: "created_at" })
	createdAt: string;

	@Column({ name: "todo_id" })
	todoId: number;

	@ManyToOne(() => Todo, (todo) => todo.comments)
	@JoinColumn({ name: "todo_id" })
	todo: Todo;
}
