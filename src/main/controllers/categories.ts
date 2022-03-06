import { Category } from "@/main/entities/categories";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

export class CategoriesController {
	async get(request: Request, response: Response): Promise<Response> {
		const { params } = request;

		const categoryRepository = getRepository(Category);

		if (params?.id) {
			const category = await categoryRepository.findOne(params.id);

			return response.json(category);
		}

		const categories = await categoryRepository.find();

		return response.json(categories);
	}

	async post(request: Request, response: Response): Promise<Response> {
		const { body } = request;

		if (!body.label || !body.type) {
			return response.status(400).json({
				message: "label and type are required",
			});
		}

		const categoryRepository = getRepository(Category);

		const category = categoryRepository.create({
			categoryType: body.type,
			label: body.label,
		});

		const newCategory = await categoryRepository.save(category);

		return response.json(newCategory);
	}

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

		const categoryRepository = getRepository(Category);

		const category = await categoryRepository.findOne(params.id);

		if (!category) {
			return response.status(404).json({
				message: "category not found",
			});
		}

		category.label = body.label;
		category.categoryType = body.type;

		const updatedCategory = await categoryRepository.save(category);

		return response.json(updatedCategory);
	}

	async delete(request: Request, response: Response): Promise<Response> {
		const { params } = request;

		if (!params?.id) {
			return response.status(400).json({
				message: "id is required",
			});
		}

		const categoryRepository = getRepository(Category);

		const category = await categoryRepository.findOne(params.id);

		if (!category) {
			return response.status(404).json({
				message: "category not found",
			});
		}

		await categoryRepository.delete(params.id);

		return response.status(204).json();
	}
}
