module.exports = {
	extends: ['eslint:recommended'],
	env: {
		node: true,
		browser: true,
		es2022: true,
	},
	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module',
	},
	rules: {
		'no-var': 2,
		'no-unused-vars': 0,
	},
};
