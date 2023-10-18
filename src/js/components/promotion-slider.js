import Swiper from 'swiper';
import { Navigation, Thumbs, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

import { buildSwiper, removeSwiper } from './build-swiper';

const CLASS_NAMES = {
	slider: '.js-promotion-slider',
	wrapper: '.js-promotion-slider-w',
	arrowNext: '.js-slider-navigation-next',
	arrowPrev: '.js-slider-navigation-prev',
	thumbSlider: '.js-promotion-thumb',
	thumbWrapper: '.js-promotion-thumb-w',
};

const promotionSlider = () => {
	const $sliderWrappers = document.querySelectorAll(CLASS_NAMES.wrapper);
	const $thumbWrapper = document.querySelector(CLASS_NAMES.thumbWrapper);

	if (!$sliderWrappers.length) return;
	if (!$thumbWrapper) return;

	$sliderWrappers.forEach(($wrapper) => {
		const $thumbSlider = $thumbWrapper.querySelector(CLASS_NAMES.thumbSlider);
		buildSwiper($thumbSlider);

		const thumbInstance = new Swiper($thumbSlider, {
			modules: [Thumbs, EffectFade],
			effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},

			allowTouchMove: false,
			slidesPerView: 1,
			spaceBetween: 5,
			speed: 1400,
		});

		const $slider = $wrapper.querySelector(CLASS_NAMES.slider);
		const $prevArrow = $wrapper.querySelector(CLASS_NAMES.arrowPrev);
		const $nextArrow = $wrapper.querySelector(CLASS_NAMES.arrowNext);

		buildSwiper($slider);

		const sliderInstance = new Swiper($slider, {
			modules: [Navigation, Thumbs],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 10,
			speed: 1000,
			navigation: {
				prevEl: $prevArrow,
				nextEl: $nextArrow,
			},
			thumbs: {
				swiper: thumbInstance,
			},
		});
	});
};

export default promotionSlider;
