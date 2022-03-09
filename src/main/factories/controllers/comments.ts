import {
	CommentsRepositoryAdapter,
	CreateCommentService,
	DeleteCommentService,
} from "@/data/comments";
import { CommentsController } from "@/main/controllers/comments";

export function commentsControllerFactory() {
	const commentsRepository = new CommentsRepositoryAdapter();

	const createComment = new CreateCommentService(commentsRepository);
	const deleteComment = new DeleteCommentService(commentsRepository);

	return new CommentsController(createComment, deleteComment);
}
