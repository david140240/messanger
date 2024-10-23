import { defineStore } from 'pinia';

export const useTooltipStore = defineStore('tooltip', () => {
	const data = reactive({
		isTooltipVisible: false,
	});
	return { data };
});
