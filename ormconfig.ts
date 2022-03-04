export default {
	name: "default",
	type: "mysql",
	host: "localhost",
	port: 33060,
	username: "todo",
	password: "todo",
	database: "todos",
	synchronize: true,
	entities: ["src/entities/**/*.ts"],
	migrations: ["./database/migrations/**/*.ts"],
	cli: {
		migrationsDir: "./database/migrations",
	},
};
