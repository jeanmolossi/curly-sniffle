import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "@/data/todo";

@Entity("categories")
export class Category {
	@PrimaryGeneratedColumn({ name: "category_id" })
	categoryId: string;

	@Column()
	label: string;

	@Column({ name: "category_type" })
	categoryType: string;

	@ManyToMany(() => Todo)
	todos: Todo[];
}
