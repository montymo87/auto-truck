import { exist } from '../utils';

/* eslint-disable */
const map = () => {
	const SELECTORS = {
		map: '#map',
		mapTrigger: '.js-map-trigger',
		worktime: '.js-map-worktime',
		clients: '.js-map-clients',
	};

	const CLASSNAMES = {
		navActiveState: 'map__nav_item--active_state',
	};

	const $map = document.querySelector(SELECTORS.map);
	const $mapTriggers = document.querySelectorAll(SELECTORS.mapTrigger);
	const $worktime = document.querySelector(SELECTORS.worktime);
	const $clients = document.querySelector(SELECTORS.clients);

	let myCoordinates = [];
	let myMap;
	let settings = {
		center: [55.844733, 37.572908],
		zoom: 15,
		controls: [],
	};

	if (!exist($map) || !exist($mapTriggers)) return;

	const replaceInfo = () => {
		if (!exist($worktime) || !exist($clients)) return;

		$mapTriggers.forEach((item, index) => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				$mapTriggers.forEach((el) => el.classList.remove(CLASSNAMES.navActiveState));
				item.classList.add(CLASSNAMES.navActiveState);

				$worktime.innerText = item.dataset.worktime || '';
				$clients.innerText = item.dataset.clients || '';

				let newCoordinates = myCoordinates[index];
				myMap.panTo(newCoordinates, { flying: true, duration: 2000 });
			});
		});
	};

	const listCoordinates = () => {
		$mapTriggers.forEach((item) => {
			let arr = [];
			let cord = item.dataset.cord.split(',', 2);
			cord.forEach((item) => {
				arr.push(Number(item));
			});

			myCoordinates.push(arr);
		});
	};

	const init = () => {
		myMap = new ymaps.Map($map, settings, {
			searchControlProvider: 'yandex#search',
		});
		let collection = new ymaps.GeoObjectCollection(null, {
			preset: 'islands#redIcon',
		});

		myCoordinates.forEach((item, index) => {
			collection.add(new ymaps.Placemark(item));
		});

		myMap.geoObjects.add(collection);
	};

	listCoordinates();
	ymaps.ready(init);
	replaceInfo();
};

export default map;
