import { UpdateCallback } from "@/domain";
import { CategoryEntity } from "./entity";

export interface CategoryRepository {
	getAll(): Promise<CategoryEntity[]>;
	getById(categoryId: number): Promise<CategoryEntity>;
	findCategories(
		conditions: Partial<CategoryEntity>
	): Promise<CategoryEntity[]>;
	create(category: CategoryEntity): Promise<CategoryEntity>;
	update(
		categoryId: number,
		callback: UpdateCallback<CategoryEntity>
	): Promise<CategoryEntity>;
	delete(categoryId: number): Promise<void>;
}
