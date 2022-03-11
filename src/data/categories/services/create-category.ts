import { EntityAlreadyExistsError } from "@/data/common/errors";
import { CategoryEntity, CategoryRepository, CreateCategory } from "@/domain";

export class CreateCategoryService implements CreateCategory {
	constructor(private readonly repository: CategoryRepository) {}

	async run(category: CategoryEntity): Promise<CategoryEntity> {
		const hasCategoryLabel = await this.repository.findCategories({
			label: category.label,
		});

		if (hasCategoryLabel.length > 0) {
			throw new EntityAlreadyExistsError(CategoryEntity);
		}

		return this.repository.create(category);
	}
}
