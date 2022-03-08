import {
	CategoryRepositoryAdapter,
	CreateCategoryService,
	DeleteCategoryService,
	GetCategoriesService,
	GetCategoryByIdService,
	UpdateCategoryService,
} from "@/data/categories";
import { CategoriesController } from "@/main/controllers/categories";

export function categoriesControllerFactory() {
	const repository = new CategoryRepositoryAdapter();

	const getCategoryByIdService = new GetCategoryByIdService(repository);
	const getCategoriesService = new GetCategoriesService(repository);
	const createCategoryService = new CreateCategoryService(repository);
	const updateCategoryService = new UpdateCategoryService(repository);
	const deleteCategoryService = new DeleteCategoryService(repository);

	return new CategoriesController(
		getCategoryByIdService,
		getCategoriesService,
		createCategoryService,
		updateCategoryService,
		deleteCategoryService
	);
}
