import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./categories";
import { Comment } from "./comments";

@Entity("todos")
export class Todo {
	@PrimaryGeneratedColumn({ name: "todo_id" })
	todoId: number;

	@Column({ name: "title" })
	title: string;

	@Column({ name: "description" })
	description: string;

	@Column({ name: "board_index" })
	boardIndex: number;

	@Column({ name: "board_ref" })
	boardRef: string;

	@ManyToMany(() => Category)
	@JoinTable()
	categories: Category[];

	@OneToMany(() => Comment, (comment) => comment.todo)
	comments: Comment[];
}
