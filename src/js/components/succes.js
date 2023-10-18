const succes = (succes) => {
	const state = document.querySelector(succes);
	state.classList.toggle('active');
	setTimeout(() => {
		state.classList.remove('active');
	}, 3000);
};

export default succes;
