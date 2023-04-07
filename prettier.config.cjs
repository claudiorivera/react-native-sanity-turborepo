/** @type {import("prettier").Config & { [key:string]: any }} */
const config = {
	trailingComma: "all",
	useTabs: true,
	plugins: [
		"@ianvs/prettier-plugin-sort-imports",
		"prettier-plugin-tailwindcss",
	],
	tailwindConfig: "./packages/config/tailwind",
	importOrder: [
		"^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
		"^(cms(.*)$)|^(cms$)",
		"^(mobile(.*)$)|^(mobile$)",
		"<THIRD_PARTY_MODULES>",
		"^@acme/(.*)$",
		"",
		"^~/utils/(.*)$",
		"^~/components/(.*)$",
		"^~/styles/(.*)$",
		"^~/(.*)$",
		"^[./]",
	],
	importOrderSeparation: false,
	importOrderSortSpecifiers: true,
	importOrderBuiltinModulesToTop: true,
	importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
	importOrderMergeDuplicateImports: true,
	importOrderCombineTypeAndValueImports: true,
};

module.exports = config;
