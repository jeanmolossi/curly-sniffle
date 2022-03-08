import { Request, Response } from "express";
import { Controller, Delete, Get, Post, Put } from "../decorators/controller";
import {
	CreateCategory,
	DeleteCategory,
	GetCategories,
	GetCategoryById,
	UpdateCategory,
} from "@/domain";

@Controller("/categories")
export class CategoriesController {
	constructor(
		private readonly getCategoryByIdService: GetCategoryById,
		private readonly getCategoriesService: GetCategories,
		private readonly createCategoryService: CreateCategory,
		private readonly updateCategoryService: UpdateCategory,
		private readonly deleteCategoryService: DeleteCategory
	) {}

	@Get("/:id")
	async get(request: Request, response: Response): Promise<Response> {
		const { params } = request;

		if (!params?.id) {
			throw new Error("id is required");
		}

		const categories = await this.getCategoryByIdService.run(+params.id);

		return response.json(categories);
	}

	@Get()
	async show(_: Request, response: Response): Promise<Response> {
		const categories = await this.getCategoriesService.run();

		return response.json(categories);
	}

	@Post()
	async post(request: Request, response: Response): Promise<Response> {
		const { body } = request;

		if (!body.label || !body.type) {
			return response.status(400).json({
				message: "label and type are required",
			});
		}

		body.categoryType = body.type;
		delete body.type;

		const newCategory = await this.createCategoryService.run(body);

		return response.json(newCategory);
	}

	@Put("/:id")
	async put(request: Request, response: Response): Promise<Response> {
		const { body, params } = request;

		if (!body.label || !body.type) {
			return response.status(400).json({
				message: "label and type are required",
			});
		}

		if (!params?.id) {
			return response.status(400).json({
				message: "id is required",
			});
		}

		body.categoryType = body.type;
		delete body.type;

		const updatedCategory = await this.updateCategoryService.run(
			+params.id,
			body
		);

		return response.json(updatedCategory);
	}

	@Delete("/:id")
	async delete(request: Request, response: Response): Promise<Response> {
		const { params } = request;

		if (!params?.id) {
			return response.status(400).json({
				message: "id is required",
			});
		}

		await this.deleteCategoryService.run(+params.id);

		return response.status(204).json();
	}
}
