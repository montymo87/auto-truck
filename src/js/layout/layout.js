// ------------------- imports
import { onWindowResize } from 'utils';
// ------------------- imports###

// ------------------  import components
import { calcViewportHeight } from '../utils';
import header from '../components/header';
// ------------------  import components###

const layout = () => {
	onWindowResize(() => {
		calcViewportHeight();
	});
	calcViewportHeight();
	header();
};

export default layout;
