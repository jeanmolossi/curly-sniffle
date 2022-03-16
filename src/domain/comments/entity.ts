import { ValidationErrors } from "../common";

const DEFAULT_USER_PHOTO = "https://randomuser.me/api/portraits/lego/1.jpg";
const MIN_USERNAME_LENGTH = 3;
const MIN_COMMENT_LENGTH = 15;
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
		const errors = new ValidationErrors();

		if (!this.userName) {
			errors.addError("userName", "field is required");
		}

		if (this.userName && this.userName.length < MIN_USERNAME_LENGTH) {
			errors.addError(
				"userName",
				`field must be at least ${MIN_USERNAME_LENGTH} characters`
			);
		}

		if (!this.comment) {
			errors.addError("comment", "field is required");
		}

		if (this.comment.length < MIN_COMMENT_LENGTH) {
			errors.addError(
				"comment",
				`field must be at least ${MIN_COMMENT_LENGTH} characters`
			);
		}

		if (!this.createdAt) {
			errors.addError("createdAt", "field is required");
		}

		if (
			this.createdAt &&
			new Date(this.createdAt).toString() === "Invalid Date"
		) {
			errors.addError("createdAt", "field should be a valid date");
		}

		if (!this.todoId) {
			errors.addError("todoId", "field is required");
		}

		if (errors.shouldThrownError()) {
			throw errors;
		}
	}
}
