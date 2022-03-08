import { CategoryEntity } from "@/domain";
import { TodoMapper } from "@/data/todo";
import { Category } from "./categories.entity";

export class CategoryMapper {
	static toDomain(category: Category): CategoryEntity {
		return new CategoryEntity(
			category.categoryId,
			category.label,
			category.categoryType,
			TodoMapper.arrayToDomain(category.todos)
		);
	}

	static arrayToDomain(categories: Category[]): CategoryEntity[] {
		return categories?.map(CategoryMapper.toDomain);
	}

	static toPersistence(category: CategoryEntity): Category {
		return Object.assign(new Category(), category);
	}

	static arrayToPersistence(categories: CategoryEntity[]): Category[] {
		return categories?.map(CategoryMapper.toPersistence);
	}
}
