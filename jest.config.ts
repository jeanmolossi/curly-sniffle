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
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	moduleNameMapper: {
		"@/(.*)$": "<rootDir>/src/$1",
	},
};
