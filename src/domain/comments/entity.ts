const DEFAULT_USER_PHOTO = "https://randomuser.me/api/portraits/lego/1.jpg";

export class CommentEntity {
	constructor(
		public commentId: number,
		public userName: string,
		public userPhoto: string = DEFAULT_USER_PHOTO,
		public comment: string,
		public createdAt: string,
		public todoId: number
	) {
		this.validate();
	}

	private validate() {
		if (!this.userName) {
			throw new Error("User name is required.");
		}

		if (this.userName.length < 3) {
			throw new Error("User name must be at least 3 characters long");
		}

		if (!this.comment) {
			throw new Error("Comment is required.");
		}

		if (this.comment.length < 15) {
			throw new Error("Comment must be at least 15 characters long");
		}

		if (!this.createdAt) {
			throw new Error("Created at is required.");
		}

		if (!this.todoId) {
			throw new Error("Todo id is required.");
		}
	}
}
