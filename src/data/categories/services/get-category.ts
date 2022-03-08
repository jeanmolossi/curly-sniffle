import { CategoryEntity, CategoryRepository, GetCategoryById } from "@/domain";

export class GetCategoryByIdService implements GetCategoryById {
	constructor(private readonly repository: CategoryRepository) {}

	async run(categoryId: number): Promise<CategoryEntity> {
		const category = await this.repository.getById(categoryId);

		if (!category) {
			throw new Error("Category not found");
		}

		return category;
	}
}
