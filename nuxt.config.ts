export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: false },
	modules: ['@pinia/nuxt'],
	runtimeConfig: {
		public: {
			baseURL: process.env.BASE_URL,
		},
	},
});
