import { exist } from '../utils';

const clipText = () => {
	const SELECTORS = {
		trigger: '.js-clip-trigger',
		text: '.js-clip-text',
		wrapper: '.js-clip-wrapper',
	};

	const CLASSNAMES = {
		activeState: 'read_more--active_state',
	};

	const $wrapper = document.querySelectorAll(SELECTORS.wrapper);

	if (!exist($wrapper)) return;

	$wrapper.forEach(($item) => {
		const $trigger = $item.querySelector(SELECTORS.trigger);
		const $text = $item.querySelector(SELECTORS.text);

		if (!exist($trigger) || !exist($text)) return;

		$trigger.addEventListener('click', () => {
			$item.classList.toggle(CLASSNAMES.activeState);
		});
	});
};

export default clipText;
