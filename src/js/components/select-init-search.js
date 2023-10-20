import 'tom-select/dist/css/tom-select.css';
import TomSelect from 'tom-select';
import { exist } from '../utils/index';

const selectInitSearch = () => {
	const SELECTORS = {
		trigger: '.js-select-filter-search',
	};

	const CLASSNAMES = {};

	const $select = document.querySelector(SELECTORS.trigger);

	if (!exist($select)) return null;

	const initSelect = new TomSelect($select, {
		render: {
			// eslint-disable-next-line
			option: function (data, escape) {
				return `<div class="search_bar__select_option_item" ><img class="search_bar__select_icon" src="${data.src}">${data.text}</div>`;
			},
			// eslint-disable-next-line
			item: function (item, escape) {
				return `<div class="search_bar__select_option_item" ><img class="search_bar__select_icon" src="${item.src}">${item.text}</div>`;
			},
		},
	});

	return null;
};

export default selectInitSearch;
