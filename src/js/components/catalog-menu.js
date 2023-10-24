import { exist } from '../utils';

const catalogMenu = () => {
	const SELECTORS = {
		catalogTrigger: '.js-header-catalog-menu-trigger',
		listTrigger: '.js-list-trigger',
		menu: '.js-list-catalog',
		submenu: '.js-sublist-catalog',
	};

	const CLASSNAMES = {
		menuActiveState: 'menu_catalog--active_state',
		submenuActiveState: 'menu_catalog__sub_w--active_state',
	};

	const $body = document.querySelector('body');
	const $menu = document.querySelector(SELECTORS.menu);
	const $catalogTrigger = document.querySelector(SELECTORS.catalogTrigger);
	const $listTriggers = $menu.querySelectorAll(SELECTORS.listTrigger);
	const $subMenu = $menu.querySelectorAll(SELECTORS.submenu);

	let isOpen = false;

	$catalogTrigger.addEventListener('click', () => {
		$menu.classList.toggle(CLASSNAMES.menuActiveState);
	});

	$listTriggers.forEach((item) => {
		item.addEventListener('click', () => {
			$subMenu.forEach((el) => el.classList.remove(CLASSNAMES.submenuActiveState));
			item.querySelector(SELECTORS.submenu).classList.toggle(CLASSNAMES.submenuActiveState);
		});
	});

	$body.addEventListener('click', (e) => {
		let target = e.target.closest(SELECTORS.menu);
		let checkActiveState = $menu.classList.contains(CLASSNAMES.menuActiveState);

		if (checkActiveState) {
			if (isOpen && !target) {
				$menu.classList.remove(CLASSNAMES.menuActiveState);
				isOpen = false;
			} else {
				isOpen = true;
			}
		}
	});
};

export default catalogMenu;
