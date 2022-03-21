import "dotenv/config";

export default {
	name: "default",
	type: "mysql",
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ?? 3306,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_BASE,
	synchronize: true,
	// logging: true,
	entities: ["src/main/entities/**/*.ts", "src/data/**/*.entity.ts"],
	migrations: ["./database/migrations/**/*.ts"],
	cli: {
		migrationsDir: "./database/migrations",
	},
};
