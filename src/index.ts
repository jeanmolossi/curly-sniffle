import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { CategoriesController } from "./controllers/categories";
import { CommentsController } from "./controllers/comments";
import { TodoController } from "./controllers/todo";

const app = express();

app.use(express.json());
app.use(cors());

createConnection();

app.get("/", (req, res) => {
	return res.json({ message: "Hello World" });
});

const todo = new TodoController();
const category = new CategoriesController();
const comment = new CommentsController();

const router = express.Router();

const todoRouter = express.Router();
const categoryRouter = express.Router();

todoRouter.get("/:id", todo.get.bind(todo));
todoRouter.get("/", todo.get.bind(todo));
todoRouter.post("/", todo.post.bind(todo));
todoRouter.put("/:id", todo.put.bind(todo));
todoRouter.delete("/:id", todo.delete.bind(todo));
todoRouter.post("/:id/comment", comment.post.bind(comment));
todoRouter.delete("/:id/comment/:commentId", comment.delete.bind(comment));

categoryRouter.get("/", category.get.bind(category));
categoryRouter.get("/:id", category.get.bind(category));
categoryRouter.post("/", category.post.bind(category));
categoryRouter.put("/:id", category.put.bind(category));
categoryRouter.delete("/:id", category.delete.bind(category));

router.use("/todo", todoRouter);
router.use("/categories", categoryRouter);

app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
