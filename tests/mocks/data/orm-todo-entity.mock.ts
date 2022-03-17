import faker from "@faker-js/faker";
import { Todo } from "@/data/todo";

type Override = Partial<Todo>;
export function mockOrmTodoEntity(override?: Override): Todo {
	const todoMock: Override = {
		todoId: faker.datatype.number(),
		title: faker.name.title(),
		description: faker.lorem.sentence(),
		author: faker.name.firstName(),
		boardIndex: faker.datatype.number(),
		boardRef: faker.database.column(),
		categories: [],
		comments: [],
	};

	return Object.assign(new Todo(), todoMock, override);
}
