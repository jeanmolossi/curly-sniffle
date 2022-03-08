import { TodoEntity } from "@/domain/todo/entity";

export class CategoryEntity {
	constructor(
		public categoryId: string,
		public label: string,
		public categoryType: string,
		public todos: TodoEntity[]
	) {
		this.validate();
	}

	private validate() {
		if (!this.categoryId) {
			throw new Error("Category id is required");
		}
		if (!this.label) {
			throw new Error("Category label is required");
		}
		if (!this.categoryType) {
			throw new Error("Category type is required");
		}
	}
}
