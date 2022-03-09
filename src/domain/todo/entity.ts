import { CategoryEntity } from "@/domain/categories/entity";
import { CommentEntity } from "@/domain/comments/entity";

const MIN_DESCRIPTION_LENGTH = 1;

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
		if (!this.title) {
			throw new Error("Todo title is required.");
		}

		if (!this.description) {
			throw new Error("Todo description is required.");
		}

		if (this.description.length < MIN_DESCRIPTION_LENGTH) {
			throw new Error(
				`Todo description must be at least ${MIN_DESCRIPTION_LENGTH} character long.`
			);
		}

		if (!this.author) {
			throw new Error("Todo author is required.");
		}

		if (!this.boardRef) {
			throw new Error("Todo board ref is required.");
		}
	}
}
