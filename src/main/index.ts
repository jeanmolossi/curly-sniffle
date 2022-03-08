import "reflect-metadata";
import express, {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { CategoriesController } from "./controllers/categories";
import { CommentsController } from "./controllers/comments";
import { todoControllerFactory } from "./factories/controllers/todo";
import { registerControllers } from "./decorators/controller";
import { TodoController } from "./controllers/todo";
import { categoriesControllerFactory } from "./factories/controllers/categories";

export const app = express();

app.use(express.json());
app.use(cors());

async function run() {
	await createConnection();

	app.get("/", (req, res) => {
		return res.json({ message: "Hello World" });
	});

	const todoController = todoControllerFactory();
	const categoryController = categoriesControllerFactory();

	const comment = new CommentsController();

	const router = express.Router();

	const todoRouter = express.Router();
	const categoryRouter = express.Router();

	// todoRouter.post("/:id/comment", comment.post.bind(comment));
	// todoRouter.delete("/:id/comment/:commentId", comment.delete.bind(comment));

	router.use(registerControllers(todoRouter, todoController));
	router.use(registerControllers(categoryRouter, categoryController));

	app.use("/api", router);

	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

run();
