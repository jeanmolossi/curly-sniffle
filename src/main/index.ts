import "reflect-metadata";
import express from "express";
import { todoControllerFactory } from "./factories/controllers/todo";
import { categoriesControllerFactory } from "./factories/controllers/categories";
import { commentsControllerFactory } from "./factories/controllers/comments";
import { Application } from "./app/application";
import { createConnection } from "typeorm";

async function bootstrap() {
	await createConnection();

	const router = express.Router();

	const todoController = todoControllerFactory();
	const categoryController = categoriesControllerFactory();
	const commentController = commentsControllerFactory();

	await Application.register(
		{
			router,
			controllers: [todoController, commentController],
		},
		{
			router,
			controllers: [categoryController],
		}
	).start();
}

bootstrap();
