export class TodoEntity {
	constructor(
		public todoId: number,
		public title: string,
		public description: string,
		public author: string,
		public boardIndex: number,
		public boardRef: string,
		public categories: [] = [],
		public comments: [] = []
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

		if (this.description.length < 15) {
			throw new Error(
				"Todo description must be at least 15 character long. Current length: " +
					this.description.length
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
