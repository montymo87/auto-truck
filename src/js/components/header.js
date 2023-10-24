import { onWindowScroll, exist, getWindowSize } from '../utils';

const header = () => {
	const SELECTORS = {
		header: '.js-header',
		menuTrigger: '.js-header-menu-trigger',

		catalogTrigger: '.js-header-catalog-menu-trigger',
		listTrigger: '.js-list-trigger',
		menu: '.js-list-catalog',
		menuMpbile: '.js-list-mobile-catalog',
		submenu: '.js-sublist-catalog',
		locationDropdown: '.js-locatio-dropdown',
		locationBtn: '.header__control_location',
	};

	const CLASSNAMES = {
		bodyOpenMenuState: 'body--open_menu_state',
		headerScrollState: 'header--scroll_state',
		headerScrollPos: 'header--pos_state',

		menuActiveState: 'menu_catalog--active_state',
		submenuActiveState: 'menu_catalog__sub_w--active_state',
	};

	const $body = document.body;
	const $header = document.querySelector(SELECTORS.header);
	const $menuTriggers = document.querySelectorAll(SELECTORS.menuTrigger);
	const $menu = document.querySelector(SELECTORS.menu);
	const $locationDropdown = document.querySelectorAll(SELECTORS.locationDropdown);

	const $catalogTrigger = document.querySelector(SELECTORS.catalogTrigger);
	// const $menuMpbile = document.querySelector(SELECTORS.menuMpbile);
	// const $listTriggers = $menu.querySelectorAll(SELECTORS.listTrigger);
	// const $subMenu = $menu.querySelectorAll(SELECTORS.submenu);

	let isMenuOpen = false;
	let isCatalogOpen = false;
	let prevScrollPos = window.scrollY;
	let posDiff = 0;
	let saveZone;

	$catalogTrigger.addEventListener('click', () => {
		$menu.classList.add(CLASSNAMES.menuActiveState);
	});

	const locationDropdownInit = () => {
		if (!exist($locationDropdown)) return;
		$locationDropdown.forEach((item) => {
			item.addEventListener('click', (e) => {
				const title = item.querySelector('.header__control_location_title');
				let prevText = title.innerText;
				let target = e.target.text;

				title.innerText = target || prevText;
			});
		});
	};

	$body.addEventListener('click', (e) => {
		let target = e.target.closest(SELECTORS.menu);
		let checkActiveState = $menu.classList.contains(CLASSNAMES.menuActiveState);

		if (checkActiveState) {
			if (isCatalogOpen && !target) {
				$menu.classList.remove(CLASSNAMES.menuActiveState);
				isCatalogOpen = false;
			} else {
				isCatalogOpen = true;
			}
		}
	});

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
			$menu.classList.remove(CLASSNAMES.menuActiveState);
			isCatalogOpen = false;
		} else if (prevScrollPos < window.scrollY) {
			$header.classList.add(CLASSNAMES.headerScrollPos);
			$menu.classList.remove(CLASSNAMES.menuActiveState);
			isCatalogOpen = false;
		} else if (prevScrollPos > window.scrollY) {
			posDiff = prevScrollPos - window.scrollY > saveZone;
			setTimeout(() => {
				if (posDiff) {
					$header.classList.remove(CLASSNAMES.headerScrollPos);
					isCatalogOpen = false;
				}
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
	locationDropdownInit();
};

export default header;
