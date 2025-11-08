// Функции для страницы услуг
document.addEventListener('DOMContentLoaded', function () {
	initServiceButtons();
	initServiceCategories();
	initServiceSearch();
	initLoadMore();
});

// Массив дополнительных услуг
const additionalServices = [
	{
		icon: 'fas fa-user-secret',
		title: 'Тестирование на социальную инженерию',
		description: 'Проверка осведомленности сотрудников о киберугрозах через моделирование атак социальной инженерии.',
		features: [
			'Фишинг-кампании',
			'Телефонные атаки',
			'Анализ поведения сотрудников',
			'Рекомендации по обучению'
		],
		price: 'от 40 000 ₽'
	},
	{
		icon: 'fas fa-wifi',
		title: 'Аудит Wi-Fi сетей',
		description: 'Комплексная проверка безопасности беспроводных сетей организации на предмет уязвимостей.',
		features: [
			'Сканирование эфира',
			'Тестирование шифрования',
			'Анализ конфигураций',
			'Рекомендации по защите'
		],
		price: 'от 30 000 ₽'
	},
	{
		icon: 'fas fa-microchip',
		title: 'Аудит IoT устройств',
		description: 'Проверка безопасности интернета вещей: умных устройств, сенсоров и промышленного оборудования.',
		features: [
			'Анализ прошивок',
			'Тестирование коммуникаций',
			'Проверка физической защиты',
			'Аудит API и облачных сервисов'
		],
		price: 'от 55 000 ₽'
	},
	{
		icon: 'fas fa-flag',
		title: 'Упражнения красной команды',
		description: 'Реалистичное моделирование сложных многоэтапных атак для проверки готовности к реальным инцидентам.',
		features: [
			'Многоэтапные атаки',
			'Тестирование SOC',
			'Анализ реакции на инциденты',
			'Рекомендации по улучшению'
		],
		price: 'от 120 000 ₽'
	}
];

let servicesLoaded = false;

function initLoadMore() {
	const loadMoreBtn = document.querySelector('.load-more');
	if (loadMoreBtn) {
		loadMoreBtn.addEventListener('click', function () {
			if (!servicesLoaded) {
				loadAdditionalServices();
				servicesLoaded = true;
				// Скрываем кнопку после загрузки
				this.style.display = 'none';
			}
		});
	}
}

function loadAdditionalServices() {
	const servicesGrid = document.querySelector('.services-grid');

	if (servicesGrid) {
		additionalServices.forEach((service, index) => {
			const serviceCard = createServiceCard(service, index);
			servicesGrid.appendChild(serviceCard);
		});

		// Переинициализируем обработчики для новых карточек
		initServiceButtons();

		// Обновляем фильтрацию для новых карточек
		const activeCategory = document.querySelector('.category-btn.active').textContent;
		filterServicesByCategory(activeCategory);
	}
}

function createServiceCard(service, index) {
	const card = document.createElement('div');
	card.className = 'service-card loading';
	card.style.animationDelay = `${index * 0.1}s`;

	// Используем HTML entities для иконок или обычные классы Font Awesome
	card.innerHTML = `
        <div class="service-icon">
            <i class="${service.icon}"></i>
        </div>
        <div class="service-content">
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
            <div class="service-features">
                ${service.features.map(feature => `
                    <div class="service-feature">
                        <i class="fas fa-check"></i>
                        ${feature}
                    </div>
                `).join('')}
            </div>
            <div class="service-price">${service.price}</div>
            <button class="service-button">Выбрать услугу</button>
        </div>
    `;

	return card;
}

function initServiceButtons() {
	// Обработка выбора услуги
	document.querySelectorAll('.service-button').forEach(button => {
		// Убираем старые обработчики чтобы избежать дублирования
		button.replaceWith(button.cloneNode(true));
	});

	// Добавляем новые обработчики
	document.querySelectorAll('.service-button').forEach(button => {
		button.addEventListener('click', function () {
			const serviceTitle = this.closest('.service-card').querySelector('.service-title').textContent;
			const servicePrice = this.closest('.service-card').querySelector('.service-price').textContent;

			// Перенаправляем на страницу оплаты с параметрами
			const url = `payment.html?service=${encodeURIComponent(serviceTitle)}&price=${encodeURIComponent(servicePrice.replace(/[^\d]/g, ''))}`;
			window.location.href = url;
		});
	});
}

function initServiceCategories() {
	// Обработка категорий услуг
	document.querySelectorAll('.category-btn').forEach(btn => {
		btn.addEventListener('click', function () {
			document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
			this.classList.add('active');

			const category = this.textContent;
			filterServicesByCategory(category);
		});
	});
}

function initServiceSearch() {
	// Обработка поиска
	const searchBox = document.querySelector('.search-box');
	if (searchBox) {
		searchBox.addEventListener('input', function () {
			const searchTerm = this.value.toLowerCase();
			filterServicesBySearch(searchTerm);
		});
	}
}

function filterServicesByCategory(category) {
	const serviceCards = document.querySelectorAll('.service-card');

	serviceCards.forEach(card => {
		if (category === 'Все услуги') {
			card.style.display = 'block';
		} else {
			const serviceTitle = card.querySelector('.service-title').textContent.toLowerCase();
			// Простая логика фильтрации по категориям
			if ((category === 'Пентестинг' && (serviceTitle.includes('пентест') || serviceTitle.includes('тестирование') || serviceTitle.includes('красной команды'))) ||
				(category === 'Анализ кода' && serviceTitle.includes('анализ кода')) ||
				(category === 'Консалтинг' && (serviceTitle.includes('аудит') || serviceTitle.includes('консалтинг') || serviceTitle.includes('социальной'))) ||
				(category === 'Аудит' && (serviceTitle.includes('аудит') || serviceTitle.includes('wi-fi') || serviceTitle.includes('iot')))) {
				card.style.display = 'block';
			} else {
				card.style.display = 'none';
			}
		}
	});
}

function filterServicesBySearch(searchTerm) {
	const serviceCards = document.querySelectorAll('.service-card');

	serviceCards.forEach(card => {
		const serviceTitle = card.querySelector('.service-title').textContent.toLowerCase();
		const serviceDescription = card.querySelector('.service-description').textContent.toLowerCase();

		if (serviceTitle.includes(searchTerm) || serviceDescription.includes(searchTerm)) {
			card.style.display = 'block';
		} else {
			card.style.display = 'none';
		}
	});
}