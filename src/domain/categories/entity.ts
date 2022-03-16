import { EntityLabel, ValidationErrors } from "@/domain/common";
import { TodoEntity } from "@/domain/todo/entity";

@EntityLabel("Category")
export class CategoryEntity {
	constructor(
		public categoryId: string,
		public label: string,
		public categoryType: string,
		public todos?: TodoEntity[]
	) {
		this.validate();
	}

	private validate() {
		const errors = new ValidationErrors();

		if (!this.categoryId) {
			errors.addError("category id", "field is required");
		}
		if (!this.label) {
			errors.addError("category label", "field is required");
		}
		if (!this.categoryType) {
			errors.addError("category type", "field is required");
		}

		if (errors.shouldThrownError()) {
			throw errors;
		}
	}
}
