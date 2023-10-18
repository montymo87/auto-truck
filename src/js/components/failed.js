const failed = (failed) => {
	const state = document.querySelector(failed);
	state.classList.toggle('active');
	setTimeout(() => {
		state.classList.remove('active');
	}, 3000);
};

export default failed;
