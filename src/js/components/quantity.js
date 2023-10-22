import { exist } from '../utils';

const quantity = () => {
	const inputParent = document.querySelectorAll('.quantity');
	if (!exist(inputParent)) return;

	inputParent.forEach(($input) => {
		let $instance = $input.querySelector('.input_number');
		let min = $instance.getAttribute('min');
		let max = $instance.getAttribute('max');

		let $minusBtn = $input.querySelector('.input_number_decrement');
		let $plusBtn = $input.querySelector('.input_number_increment');

		const trigger = () => {
			const event = document.createEvent('HTMLEvents');
			event.initEvent('change', true, false);
			return event;
		};
		const validate = () => {
			if ($instance.value >= parseInt(max)) {
				$instance.value = max;
			} else if ($instance.value <= parseInt(min)) {
				$instance.value = min;
			}
			$instance.dispatchEvent(trigger());
		};

		const up = () => {
			$instance.value = parseInt($instance.value) + 1;
			validate();
		};

		const down = () => {
			$instance.value = parseInt($instance.value) - 1;
			validate();
		};

		$plusBtn.addEventListener('click', () => {
			up();
		});
		$minusBtn.addEventListener('click', () => {
			down();
		});
	});
};

export default quantity;
