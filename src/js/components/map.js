function init() {
	var myMap = new ymaps.Map(
			'map',
			{
				center: [50.443705, 30.530946],
				zoom: 9,
			},
			{
				searchControlProvider: 'yandex#search',
			},
		),
		menu = $('<ul class="dillers_list"></ul>');

	for (var i = 0, l = citiesArray.length; i < l; i++) {
		createMenuGroup(citiesArray[i], i);
	}
	function createMenuGroup(group, i) {
		var menuItem = $('<li><a href="#result" data-id=' + i + '> ' + group.name + '</a></li>'),
			collection = new ymaps.GeoObjectCollection(null, { preset: group.style });
		myMap.geoObjects.add(collection);
		menuItem
			.appendTo(menu)
			.find('a')
			.bind('click', function () {
				getSity(this.dataset.id);
				if (collection.getParent()) {
					myMap.geoObjects.remove(collection);
				} else {
					myMap.geoObjects.add(collection);
				}
			});
		for (var j = 0, m = group.items.length; j < m; j++) {
			createSubMenu(group.items[j], collection);
		}
	}

	function createSubMenu(item, collection) {
		placemark = new ymaps.Placemark(item.center, { balloonContent: item.name });
		collection.add(placemark);
	}

	menu.appendTo($('.dillers_city_w'));
	myMap.setBounds(myMap.geoObjects.getBounds());
}

// Группы объектов

function getSity(id) {
	const cities = citiesArray[id];
	const resultBlock = document.querySelector('#result');
	resultBlock.querySelector('.dillers_result_list').innerHTML = '';
	resultBlock.querySelector('h2').innerHTML = cities.name;

	cities.items.forEach((item) => {
		// console.log(item)

		const parentLi = document.createElement('li');
		const divInfo = document.createElement('div');
		divInfo.classList.add('dillers_item_info');
		divInfo.innerHTML = `
            <div class="dillers_item_address"><ul></ul></div>
            <div class="dillers_item_phone"><ul></ul></div>
            <div class="dillers_item_email"><ul></ul></div>

            `;
		parentLi.classList.add('dillers_result_item');
		resultBlock.querySelector('.dillers_result_list').append(parentLi);

		if (item.name) {
			const divTitle = document.createElement('div');
			divTitle.classList.add('dillers_item_title');
			divTitle.innerHTML = <h4>${item.name}</h4>;
			parentLi.append(divTitle);
		}

		if (item.informations) {
			parentLi.append(divInfo);

			item.informations.forEach((address) => {
				const addressItem = document.createElement('li');
				addressItem.innerHTML = address;
				divInfo.querySelector('.dillers_item_address ul').append(addressItem);
			});
		}

		if (item.phones) {
			parentLi.append(divInfo);

			item.phones.forEach((phone) => {
				const phoneItem = document.createElement('li');
				phoneItem.innerHTML = phone;
				divInfo.querySelector('.dillers_item_phone ul').append(phoneItem);
			});

			if (item.emails) {
				parentLi.append(divInfo);
				item.emails.forEach((email) => {
					const emailItem = document.createElement('li');
					emailItem.innerHTML = email;
					divInfo.querySelector('.dillers_item_email ul').append(emailItem);
				});
			}
		}
	});
}
