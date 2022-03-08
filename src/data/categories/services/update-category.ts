import { CategoryEntity, CategoryRepository, UpdateCategory } from "@/domain";

export class UpdateCategoryService implements UpdateCategory {
	constructor(private readonly repository: CategoryRepository) {}

	async run(
		categoryId: number,
		updatedData: Partial<CategoryEntity>
	): Promise<CategoryEntity> {
		return this.repository.update(
			categoryId,
			this.runCallback(updatedData)
		);
	}

	private runCallback(updatedData: Partial<CategoryEntity>) {
		return (category: CategoryEntity): CategoryEntity => {
			Object.assign(category, updatedData);

			return category;
		};
	}
}
