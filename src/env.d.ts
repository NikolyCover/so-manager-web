/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ADDRESS_API_URL: string
	readonly VITE_PERSON_API_URL: string
	readonly VITE_APP_VERSION: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
