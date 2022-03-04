import express from "express";
import { createConnection } from "typeorm";
import { TodoController } from "./controllers/todo";

const app = express();

app.use(express.json());

createConnection();

app.get("/", (req, res) => {
	return res.json({ message: "Hello World" });
});

const todo = new TodoController();

const router = express.Router();

router.get("/:id", todo.get.bind(todo));
router.get("/", todo.get.bind(todo));
router.post("/", todo.post.bind(todo));

app.use("/api", router);

app.listen(3000, () => console.log(`Listening on port 3000`));
