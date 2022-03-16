import "reflect-metadata";
import { assertValidationError } from "@__tests__/helpers/domain-entity";
import { CategoryEntity } from "./entity";

describe("CategoryEntity", () => {
	it("should instantiate CategoryEntity", () => {
		const category = new CategoryEntity(
			"categoryId",
			"label",
			"categoryType",
			[]
		);

		expect(category).toBeDefined();
		expect(category.categoryId).toBe("categoryId");
		expect(category.label).toBe("label");
		expect(category.categoryType).toBe("categoryType");
		expect(category.todos).toBeDefined();
	});

	describe("validate", () => {
		const requiredFields = [
			"category id",
			"category label",
			"category type",
		];

		requiredFields.forEach((field) => {
			it(`should validate ${field} as required`, () => {
				try {
					const categoryId = IfMatchFieldUndefined(
						field,
						"category id"
					);

					const label = IfMatchFieldUndefined(
						field,
						"category label"
					);

					const categoryType = IfMatchFieldUndefined(
						field,
						"category type"
					);

					const _category = new CategoryEntity(
						categoryId,
						label,
						categoryType
					);

					expect(_category).toBeFalsy();
				} catch (e: any) {
					assertValidationError(e, {
						field,
						messages: ["field is required"],
					});
				}
			});
		});
	});
});

function IfMatchFieldUndefined(field: string, key: string) {
	return field === key ? (undefined as any) : field;
}
