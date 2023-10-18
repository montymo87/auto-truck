import previevSlider from 'components/preview-slider';
import mobileSlider from 'components/mobile-slider';
import promotionSlider from 'components/promotion-slider';
import productSlider from 'components/product-slider';
import clipText from 'components/clip-text';
import tabs from 'components/tabs';
import initPopup from 'components/init-popup';
import alert from 'components/alert';

import layout from 'layout/layout';
import { pageLoad } from './utils';

export default class App {
	constructor() {
		this.$htmlTag = document.querySelector('html');
		this.pageName =
			this.$htmlTag.dataset.templateName && this.$htmlTag.dataset.templateName.length > 0
				? this.$htmlTag.dataset.templateName
				: null;

		this.init = this.init.bind(this);
		this.init();
	}

	importPage() {
		if (this.pageName && this.pageName !== null) {
			import(`./pages/${this.pageName}`)
				.then(({ default: pageFunc }) => {
					const newPage = pageFunc();
				})

				.catch((error) => {
					console.error('Failed to load page, check data-template-name at root if correct');

					console.dir(error, error.stack);
				});
		}
	}

	init() {
		const initLayout = layout();
		pageLoad(() => {
			document.body.classList.add('body--loaded');

			mobileSlider(1024);
			previevSlider();
			promotionSlider();
			productSlider();
			clipText();
			tabs({
				wrapper: '.js-product-tab',
				trigger: '.js-product-tab-trigger',
				content: '.js-product-tab-content',
				triggerClass: 'product_tab__tabs_button',
				contentClass: 'product_tab__tabs_content',
			});
			initPopup('.js-popup-login-trigger', '.js-popup-login');
			initPopup('.js-popup-pas-trigger', '.js-popup-pas');
			initPopup('.js-popup-reg-trigger', '.js-popup-reg');
			alert();
		});
		setTimeout(() => {
			this.importPage();
		}, 0);
	}
}
