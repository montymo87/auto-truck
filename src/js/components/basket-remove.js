import { exist } from '../utils';

const basketRemove = () => {
	const basketRemove = document.querySelectorAll('.js-btn-basket-remove');
	const basketClear = document.querySelector('.js-clear-basket');

	if (!exist(basketRemove)) return;
	if (!exist(basketClear)) return;

	basketRemove.forEach((item) => {
		item.addEventListener('click', () => {
			item.closest('.basket__item').remove();
		});
	});

	basketClear.addEventListener('click', (e) => {
		e.preventDefault();
		const allItemInBasket = document.querySelectorAll('.basket__item');
		const totalPrice = document.querySelector('.basket__total_price');

		if (!exist(allItemInBasket)) return;

		allItemInBasket.forEach((item) => item.remove());
		// eslint-disable-next-line
		totalPrice.innerText = '0';
	});
};

export default basketRemove;
