import { CategoryRepository, DeleteCategory } from "@/domain";

export class DeleteCategoryService implements DeleteCategory {
	constructor(private readonly repository: CategoryRepository) {}

	async run(categoryId: number): Promise<void> {
		return this.repository.delete(categoryId);
	}
}
