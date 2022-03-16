/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	transform: {
		"^.+\\.[tj]sx?$": "ts-jest",
	},
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/domain/**/{repository,services}.ts",
	],
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	coverageReporters: ["lcov"],
	moduleNameMapper: {
		"@/(.*)$": "<rootDir>/src/$1",
		"@__tests__/(.*)$": "<rootDir>/tests/$1",
	},
	rootDir: "./",
	watchPathIgnorePatterns: [
		"<rootDir>/node_modules/",
		"<rootDir>/(coverage|.docker|http|database)/",
	],
	testPathIgnorePatterns: ["<rootDir>/tests/"],
};
