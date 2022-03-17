import { faker } from "@faker-js/faker";
import { TodoEntity } from "@/domain";

type Override = Partial<TodoEntity>;

export function mockTodoEntity(override?: Override): TodoEntity {
	return new TodoEntity(
		override?.todoId || faker.datatype.number(),
		override?.title || faker.name.title(),
		override?.description || faker.lorem.sentence(),
		override?.author || faker.name.firstName(),
		override?.boardIndex || faker.datatype.number(),
		override?.boardRef || faker.database.column()
	);
}
