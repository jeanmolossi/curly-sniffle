import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "@/main/entities/categories";
import { Comment } from "@/main/entities/comments";

@Entity("todos")
export class Todo {
	@PrimaryGeneratedColumn({ name: "todo_id" })
	todoId: number;

	@Column({ name: "title" })
	title: string;

	@Column({ name: "description" })
	description: string;

	@Column({ name: "author" })
	author: string;

	@Column({ name: "board_index" })
	boardIndex: number;

	@Column({ name: "board_ref" })
	boardRef: string;

	@ManyToMany(() => Category, {
		eager: true,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinTable({
		joinColumn: { name: "todo_id" },
		inverseJoinColumn: { name: "category_id" },
	})
	categories: Category[];

	@OneToMany<Comment>("comments", (comment) => comment.todo, {
		eager: true,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	comments: Comment[];
}
