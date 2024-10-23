export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.directive('click-outside', {
		mounted(el, binding) {
			const clickHandler = (event: Event) => {
				if (!(event.target === el || el.contains(event.target))) {
					console.log('56');
					binding.value(event);
				}
			};

			document.body.addEventListener('click', clickHandler);
			el._clickHandler = clickHandler;
		},

		beforeUnmount(el) {
			document.body.removeEventListener('click', el._clickHandler);
			delete el._clickHandler;
		},
	});
});
