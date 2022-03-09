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
import { commentsControllerFactory } from "./factories/controllers/comments";

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
	const commentController = commentsControllerFactory();

	const router = express.Router();

	const todoRouter = express.Router();
	const categoryRouter = express.Router();

	router.use(
		registerControllers(todoRouter, todoController, commentController)
	);
	router.use(registerControllers(categoryRouter, categoryController));

	app.use("/api", router);

	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

run();
