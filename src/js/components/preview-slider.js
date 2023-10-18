import Swiper from 'swiper';
import { Navigation, FreeMode } from 'swiper/modules';
// import 'swiper/css';
import { buildSwiper, removeSwiper } from './build-swiper';

const CLASS_NAMES = {
	slider: '.js-preview-slider',
	wrapper: '.js-preview-slider-w',
	arrowNext: '.js-slider-navigation-next',
	arrowPrev: '.js-slider-navigation-prev',
};

const previevSlider = () => {
	const $sliderWrappers = document.querySelectorAll(CLASS_NAMES.wrapper);

	if (!$sliderWrappers.length) return;

	$sliderWrappers.forEach(($wrapper) => {
		const $slider = $wrapper.querySelector(CLASS_NAMES.slider);
		const $prevArrow = $wrapper.querySelector(CLASS_NAMES.arrowPrev);
		const $nextArrow = $wrapper.querySelector(CLASS_NAMES.arrowNext);

		buildSwiper($slider);

		const sliderInstance = new Swiper($slider, {
			modules: [Navigation, FreeMode],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 30,
			speed: 800,
			navigation: {
				prevEl: $prevArrow,
				nextEl: $nextArrow,
			},

			breakpoints: {
				481: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 3,
				},
				1024: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
			},
		});
	});
};

export default previevSlider;
