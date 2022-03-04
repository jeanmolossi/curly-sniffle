import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
