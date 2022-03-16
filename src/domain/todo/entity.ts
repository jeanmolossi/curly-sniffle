import { EntityLabel, ValidationErrors } from "@/domain/common";
import { CategoryEntity } from "@/domain/categories/entity";
import { CommentEntity } from "@/domain/comments/entity";

const MIN_DESCRIPTION_LENGTH = 2;

@EntityLabel("Todo")
export class TodoEntity {
	constructor(
		public todoId: number,
		public title: string,
		public description: string,
		public author: string,
		public boardIndex: number,
		public boardRef: string,
		public categories: CategoryEntity[] = [],
		public comments: CommentEntity[] = []
	) {
		this.validate();
	}

	private validate() {
		const errors = new ValidationErrors();

		if (!this.title) {
			errors.addError("title", "field is required");
		}

		if (!this.description) {
			errors.addError("description", "field is required");
		}

		if (
			this.description &&
			this.description.length < MIN_DESCRIPTION_LENGTH
		) {
			errors.addError(
				"description",
				`field must be at least ${MIN_DESCRIPTION_LENGTH} characters`
			);
		}

		if (!this.author) {
			errors.addError("author", "field is required");
		}

		if (!this.boardRef) {
			errors.addError("boardRef", "field is required");
		}

		if (errors.shouldThrownError()) {
			throw errors;
		}
	}
}
