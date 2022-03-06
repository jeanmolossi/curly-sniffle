export default {
	name: "default",
	type: "mysql",
	host: "todo_db",
	port: 3306,
	username: "todo",
	password: "todo",
	database: "todos",
	synchronize: true,
	entities: ["src/main/entities/**/*.ts", "src/data/**/*.entity.ts"],
	migrations: ["./database/migrations/**/*.ts"],
	cli: {
		migrationsDir: "./database/migrations",
	},
};
