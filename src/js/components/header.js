import { onWindowScroll, exist, getWindowSize } from '../utils';

const header = () => {
	const SELECTORS = {
		header: '.js-header',
		menuTrigger: '.js-header-menu-trigger',
		menu: '.js-list-catalog',
	};

	const CLASSNAMES = {
		bodyOpenMenuState: 'body--open_menu_state',
		headerScrollState: 'header--scroll_state',
		headerScrollPos: 'header--pos_state',
		menuActiveState: 'menu_catalog--active_state',
	};

	const $body = document.body;
	const $header = document.querySelector(SELECTORS.header);
	const $menuTriggers = document.querySelectorAll(SELECTORS.menuTrigger);
	const $menu = document.querySelector(SELECTORS.menu);

	let isMenuOpen = false;
	let prevScrollPos = window.scrollY;
	let posDiff = 0;
	let saveZone;

	const handleTriggerClick = () => {
		if (!isMenuOpen) {
			$body.classList.add(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = true;
		} else {
			$body.classList.remove(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = false;
		}
	};

	const headerScroll = (scrollY) => {
		if (scrollY > 10 && !$header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.add(CLASSNAMES.headerScrollState);
		} else if (scrollY <= 10 && $header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.remove(CLASSNAMES.headerScrollState);
		}

		if (getWindowSize().windowWidth > 1024) {
			saveZone = 50;
		} else {
			saveZone = 10;
		}

		if (window.scrollY === 0) {
			$header.classList.remove(CLASSNAMES.headerScrollPos);
		} else if (prevScrollPos < window.scrollY) {
			$header.classList.add(CLASSNAMES.headerScrollPos);
			$menu.classList.remove(CLASSNAMES.menuActiveState);
		} else if (prevScrollPos > window.scrollY) {
			posDiff = prevScrollPos - window.scrollY > saveZone;
			setTimeout(() => {
				if (posDiff) $header.classList.remove(CLASSNAMES.headerScrollPos);
			}, 10);
		}

		prevScrollPos = window.scrollY;
	};

	const initializeEventListeners = () => {
		if (!exist($menuTriggers)) return;

		$menuTriggers.forEach(($trigger) => {
			$trigger.addEventListener('click', () => {
				handleTriggerClick();
			});
		});
	};

	if (!exist($header)) return;

	onWindowScroll(headerScroll);
	initializeEventListeners();
};

export default header;
