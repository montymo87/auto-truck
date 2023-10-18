import Swiper from 'swiper';
import { Zoom, Navigation, Thumbs } from 'swiper/modules';
// import 'swiper/css';
import 'swiper/css';
import 'swiper/css/zoom';

import { buildSwiper, removeSwiper } from './build-swiper';

const CLASS_NAMES = {
	slider: '.js-product-slider',
	wrapper: '.js-product-slider-w',
	arrowNext: '.js-slider-navigation-next',
	arrowPrev: '.js-slider-navigation-prev',
	thumbSlider: '.js-product-thumb',
	thumbWrapper: '.js-product-thumb-w',
};

const productSlider = () => {
	const $sliderWrappers = document.querySelectorAll(CLASS_NAMES.wrapper);
	const $thumbWrapper = document.querySelector(CLASS_NAMES.thumbWrapper);

	if (!$sliderWrappers.length) return;
	if (!$thumbWrapper) return;

	$sliderWrappers.forEach(($wrapper) => {
		const $thumbSlider = $thumbWrapper.querySelector(CLASS_NAMES.thumbSlider);
		buildSwiper($thumbSlider);

		const thumbInstance = new Swiper($thumbSlider, {
			modules: [Thumbs],

			spaceBetween: 10,
			slidesPerView: 3,
			direction: 'horizontal',
			observer: true,
			observeParents: true,
			breakpoints: {
				768: {
					direction: 'vertical',
					slidesPerView: 5,
				},
			},
		});

		const $slider = $wrapper.querySelector(CLASS_NAMES.slider);
		const $prevArrow = $wrapper.querySelector(CLASS_NAMES.arrowPrev);
		const $nextArrow = $wrapper.querySelector(CLASS_NAMES.arrowNext);

		buildSwiper($slider);

		const sliderInstance = new Swiper($slider, {
			modules: [Navigation, Thumbs, Zoom],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 20,
			zoom: {
				maxRatio: 2,
			},
			speed: 800,
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

export default productSlider;
