/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
	readonly VITE_API_UR: string
	readonly VITE_APP_VERSION: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
