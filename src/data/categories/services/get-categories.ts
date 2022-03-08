import { CategoryEntity, CategoryRepository, GetCategories } from "@/domain";

export class GetCategoriesService implements GetCategories {
	constructor(private readonly repository: CategoryRepository) {}

	async run(): Promise<CategoryEntity[]> {
		return this.repository.getAll();
	}
}
