import "reflect-metadata";
import { mockTodoEntity } from "@__tests__/mocks/domain/todo-entity.mock";
import { TodoEntity } from "@/domain";
import { TodoMapper } from "./todo.mapper";
import { Todo } from "./todo.entity";
import { mockOrmTodoEntity } from "@__tests__/mocks/data/orm-todo-entity.mock";

describe("TodoMapper", () => {
	it("should map single orm entity to single domain entity", () => {
		const ormEntity = mockOrmTodoEntity();
		const domainEntity = TodoMapper.toDomain(ormEntity);

		expect(ormEntity).toBeInstanceOf(Todo);
		expect(domainEntity).toBeInstanceOf(TodoEntity);
	});

	it("should map array of orm entity to array of domain entity", () => {
		const ormEntities = [mockOrmTodoEntity(), mockOrmTodoEntity()];
		const domainEntities = TodoMapper.arrayToDomain(ormEntities);

		expect(ormEntities).toBeInstanceOf(Array);
		expect(domainEntities).toBeInstanceOf(Array);
		expect(ormEntities[0]).toBeInstanceOf(Todo);
		expect(domainEntities[0]).toBeInstanceOf(TodoEntity);
	});

	it("should map orm to domain and maintain property values", () => {
		const ormEntity = mockOrmTodoEntity();
		const domainEntity = TodoMapper.toDomain(ormEntity);

		expect(domainEntity.todoId).toBe(ormEntity.todoId);
		expect(domainEntity.title).toBe(ormEntity.title);
		expect(domainEntity.description).toBe(ormEntity.description);
		expect(domainEntity.author).toBe(ormEntity.author);
		expect(domainEntity.boardIndex).toBe(ormEntity.boardIndex);
		expect(domainEntity.boardRef).toBe(ormEntity.boardRef);
	});

	it("should map single domain entity to single orm entity", () => {
		const domainEntity = mockTodoEntity();
		const ormEntity = TodoMapper.toPersistence(domainEntity);

		expect(domainEntity).toBeInstanceOf(TodoEntity);
		expect(ormEntity).toBeInstanceOf(Todo);
	});

	it("should map array of domain entity to array of orm entity", () => {
		const domainEntities = [mockTodoEntity(), mockTodoEntity()];
		const ormEntities = TodoMapper.arrayToPersistence(domainEntities);

		expect(domainEntities).toBeInstanceOf(Array);
		expect(ormEntities).toBeInstanceOf(Array);
		expect(domainEntities[0]).toBeInstanceOf(TodoEntity);
		expect(ormEntities[0]).toBeInstanceOf(Todo);
	});

	it("should map domain to orm and maintain property values", () => {
		const domainEntity = mockTodoEntity();
		const ormEntity = TodoMapper.toPersistence(domainEntity);

		expect(ormEntity.todoId).toBe(domainEntity.todoId);
		expect(ormEntity.title).toBe(domainEntity.title);
		expect(ormEntity.description).toBe(domainEntity.description);
		expect(ormEntity.author).toBe(domainEntity.author);
		expect(ormEntity.boardIndex).toBe(domainEntity.boardIndex);
		expect(ormEntity.boardRef).toBe(domainEntity.boardRef);
	});

	it("should bypass if has nothing to map", () => {
		const ormEntities = TodoMapper.arrayToPersistence(undefined as any);
		const domainEntities = TodoMapper.arrayToDomain(undefined as any);

		expect(ormEntities).toBeUndefined();
		expect(domainEntities).toBeUndefined();
	});
});
