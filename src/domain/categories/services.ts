import { UpdateCallback } from "@/domain";
import { CategoryEntity } from "./entity";

export interface CreateCategory {
	run(category: CategoryEntity): Promise<CategoryEntity>;
}

export interface UpdateCategory {
	run(
		categoryId: number,
		updateData: Partial<CategoryEntity>
	): Promise<CategoryEntity>;
}

export interface GetCategoryById {
	run(categoryId: number): Promise<CategoryEntity>;
}

export interface GetCategories {
	run(): Promise<CategoryEntity[]>;
}

export interface DeleteCategory {
	run(categoryId: number): Promise<void>;
}
