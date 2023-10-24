import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui';

const popupFancy = () => {
	console.log('work ?');

	Fancybox.bind('[data-fancybox="video-gallery"]', {
		groupAttr: false,
	});
};

export default popupFancy;
