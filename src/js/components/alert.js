import succes from './succes';
import failed from './failed';

const alert = () => {
	const wpcf7Elms = document.querySelectorAll('.wpcf7');
	// eslint-disable-next-line
	Array.from(wpcf7Elms, (wpcf7Elm) => {
		wpcf7Elm.addEventListener(
			'wpcf7mailsent',
			// eslint-disable-next-line
			function (event) {
				succes('.success');
				const popupForm = document.querySelector('.popup.popup--open_state');
				if (popupForm) {
					popupForm.classList.remove('active');
				}
			},
			false,
		);

		wpcf7Elm.addEventListener(
			'wpcf7invalid',
			// eslint-disable-next-line
			function (event) {
				failed('.failed');
				const popupForm = document.querySelector('.popup.popup--open_state');
				if (popupForm) {
					popupForm.classList.remove('active');
				}
			},
			false,
		);
	});
};

export default alert;
