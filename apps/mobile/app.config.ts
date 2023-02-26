import { type ConfigContext, type ExpoConfig } from "@expo/config";

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
	name: "React Native Sanity Turborepo",
	slug: "react-native-sanity-turborepo",
	scheme: "expo",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/icon.png",
	userInterfaceStyle: "automatic",
	splash: {
		image: "./assets/icon.png",
		resizeMode: "contain",
		backgroundColor: "#1F104A",
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		supportsTablet: true,
		bundleIdentifier: "com.claudiorivera.react-native-sanity-turborepo",
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/icon.png",
			backgroundColor: "#1F104A",
		},
	},
	extra: {
		eas: {
			projectId: "",
		},
	},
	plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
