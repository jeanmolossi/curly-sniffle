import { CategoryEntity, CategoryRepository, UpdateCallback } from "@/domain";
import { getRepository, Repository } from "typeorm";
import { CategoryMapper } from "./categories.mapper";
import { Category } from "./categories.entity";
import { NotFoundError } from "../common/errors";

export class CategoryRepositoryAdapter implements CategoryRepository {
	private readonly repository: Repository<Category>;

	constructor() {
		this.repository = getRepository(Category);
	}

	async getAll(): Promise<CategoryEntity[]> {
		const categories = await this.repository.find();
		return CategoryMapper.arrayToDomain(categories);
	}

	async getById(categoryId: number): Promise<CategoryEntity> {
		const category = await this.repository.findOne(categoryId);

		if (!category) {
			throw new NotFoundError({ message: "Category not found" });
		}

		return CategoryMapper.toDomain(category);
	}

	async findCategories(
		conditions: Partial<CategoryEntity>
	): Promise<CategoryEntity[]> {
		return CategoryMapper.arrayToDomain(
			await this.repository.find({
				where: conditions,
			})
		);
	}

	async create(category: CategoryEntity): Promise<CategoryEntity> {
		const newCategory = await this.repository.save(
			CategoryMapper.toPersistence(category)
		);

		return CategoryMapper.toDomain(newCategory);
	}

	async update(
		categoryId: number,
		callback: UpdateCallback<CategoryEntity>
	): Promise<CategoryEntity> {
		const category = await this.repository.findOne(categoryId);

		if (!category) {
			throw new NotFoundError({ message: "Category not found" });
		}

		const updatedCategory = callback(CategoryMapper.toDomain(category));
		const savedCategory = await this.repository.save(
			CategoryMapper.toPersistence(updatedCategory)
		);

		return CategoryMapper.toDomain(savedCategory);
	}

	async delete(categoryId: number): Promise<void> {
		await this.repository.delete(categoryId);
	}
}
