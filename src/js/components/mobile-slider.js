import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { buildSwiper, removeSwiper } from './build-swiper';

gsap.registerPlugin(ScrollTrigger);

const CLASS_NAMES = {
	slider: '.js-mobile-slider',
	wrapper: '.js-mobile-slider-wrapper',
	arrowNext: '.js-slider-navigation-next',
	arrowPrev: '.js-slider-navigation-prev',
};

const mobileSlider = (breakpoint) => {
	const $sliderWrappers = document.querySelectorAll(CLASS_NAMES.wrapper);

	$sliderWrappers.forEach(($wrapper) => {
		let sliderEl;
		let isInit = false;

		const $slider = $wrapper.querySelector(CLASS_NAMES.slider);
		const $prevArrow = $wrapper.querySelector(CLASS_NAMES.arrowPrev);
		const $nextArrow = $wrapper.querySelector(CLASS_NAMES.arrowNext);

		const init = () => {
			if (!isInit) {
				buildSwiper($slider);

				sliderEl = new Swiper($slider, {
					modules: [Navigation],
					observer: true,
					observeParents: true,
					watchOverflow: true,
					speed: 800,
					spaceBetween: 20,
					slidesPerView: 1,
					// slidesPerView: 'auto',
					loop: false,
					on: {
						init: () => {
							isInit = true;
						},
					},
					breakpoints: {
						480: {
							slidesPerView: 1.5,
						},
						768: {
							slidesPerView: 2.5,
						},
					},
					navigation: {
						prevEl: $prevArrow,
						nextEl: $nextArrow,
					},
				});
			}
		};

		const destroySlider = () => {
			if (isInit) {
				removeSwiper($slider);
				sliderEl.destroy();
				isInit = false;
			}
		};

		const matchMedia = gsap.matchMedia();
		console.log(matchMedia);

		matchMedia.add([`(min-width: ${breakpoint}px)`], () => {
			destroySlider();
		});
		matchMedia.add([`(max-width: ${breakpoint - 1}px)`], () => {
			init();
		});
	});
};

export default mobileSlider;
