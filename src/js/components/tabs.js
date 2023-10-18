/**
 * Default Tabs contructor
 * Functionallity:
 * toggle active state between multiple tabs/list items
 * @param {string} trigger - trigger js-selector
 * @param {string} content - content js-selector
 * @param {string} triggerClass - trigger markup selector
 * @param {string} contentClass - content markup selector
 */
function tabs({ wrapper, trigger, content, triggerClass, contentClass }) {
	const $wrapper = document.querySelector(wrapper);

	if (!$wrapper) return;

	let triggerSelector = $wrapper.querySelectorAll(trigger);
	let blockSelector = $wrapper.querySelectorAll(content);

	const activeTriggerClass = 'active_state';
	const activeContentClass = 'active_state';

	const handActiveTab = (id) => {
		$wrapper.querySelector(`.${activeTriggerClass}`)?.classList.remove(activeTriggerClass);
		$wrapper.querySelector(`.${activeContentClass}`)?.classList.remove(activeContentClass);

		$wrapper.querySelector(`.${triggerClass}[data-tab="${id}"]`).classList.add(activeTriggerClass);
		$wrapper.querySelector(`.${contentClass}[data-tab="${id}"]`).classList.add(activeContentClass);
		// uncomment for refresh gsap triggers under tabs
		// ScrollTrigger.refresh();
	};

	// set active tab from hash
	// const hash = window.location.hash.substring(1);
	// if (hash) {
	// 	handActiveTab(hash);
	// }

	if (triggerSelector.length && blockSelector.length) {
		triggerSelector.forEach((item) => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				let id = item.getAttribute('data-tab');
				handActiveTab(id);
			});
		});
	}
}

export default tabs;
