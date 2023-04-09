import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig({
	envPrefix: "REACT_APP_",
	build: {
		outDir: "build",
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: { ".js": "jsx" },
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	plugins: [reactRefresh(), envCompatible()],
});
