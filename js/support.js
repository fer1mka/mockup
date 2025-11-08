// Функции для страницы техподдержки
document.addEventListener('DOMContentLoaded', function () {
	initSupportTabs();
	initEmailForm();
	initPhoneSupport();
	initChat();
});

function initSupportTabs() {
	const supportButtons = document.querySelectorAll('.support-button');
	const tabContainers = document.querySelectorAll('.support-content > div');

	supportButtons.forEach(button => {
		button.addEventListener('click', function () {
			const tabName = this.getAttribute('data-tab');

			// Убираем активный класс у всех кнопок
			supportButtons.forEach(btn => btn.classList.remove('active'));
			// Добавляем активный класс текущей кнопке
			this.classList.add('active');

			// Скрываем все табы
			tabContainers.forEach(container => container.classList.remove('active'));
			// Показываем выбранный таб
			document.getElementById(tabName + '-tab').classList.add('active');
		});
	});
}

function initEmailForm() {
	const emailForm = document.querySelector('.email-form');
	if (emailForm) {
		const sendButton = emailForm.querySelector('.email-send-button');
		if (sendButton) {
			sendButton.addEventListener('click', function () {
				const name = document.getElementById('email-name').value;
				const email = document.getElementById('email-address').value;
				const subject = document.getElementById('email-subject').value;
				const message = document.getElementById('email-message').value;

				if (!name || !email || !subject || !message) {
					alert('Пожалуйста, заполните все поля формы');
					return;
				}

				// Здесь будет отправка email на сервер
				alert('Ваше сообщение отправлено! Мы ответим вам в течение 24 часов.');

				// Очищаем форму
				document.getElementById('email-name').value = '';
				document.getElementById('email-address').value = '';
				document.getElementById('email-subject').value = '';
				document.getElementById('email-message').value = '';
			});
		}
	}
}

function initPhoneSupport() {
	const callButton = document.getElementById('callButton');
	if (callButton) {
		callButton.addEventListener('click', function () {
			// Просто переходим на вкладку телефона, без уведомления
			const phoneButton = document.querySelector('.support-button[data-tab="phone"]');
			if (phoneButton) {
				phoneButton.click();
			}
		});
	}
}

function initChat() {
	const chatInput = document.querySelector('.chat-input');
	const sendButton = document.querySelector('.send-button');

	if (chatInput && sendButton) {
		function sendMessage() {
			const message = chatInput.value.trim();
			if (message) {
				// Добавляем сообщение пользователя в чат
				const chatMessages = document.querySelector('.chat-messages');
				const messageElement = document.createElement('div');
				messageElement.className = 'message user';
				messageElement.innerHTML = `
                    <div class="message-content">
                        <div class="message-text">${message}</div>
                        <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                `;
				chatMessages.appendChild(messageElement);

				// Очищаем поле ввода
				chatInput.value = '';

				// Прокручиваем вниз
				chatMessages.scrollTop = chatMessages.scrollHeight;

				// Имитируем ответ поддержки
				setTimeout(() => {
					const supportMessage = document.createElement('div');
					supportMessage.className = 'message support';
					supportMessage.innerHTML = `
                        <div class="message-avatar">
                            <i class="fas fa-headset"></i>
                        </div>
                        <div class="message-content">
                            <div class="message-sender">Поддержка SoSI</div>
                            <div class="message-text">Спасибо за ваше сообщение! Мы уже работаем над вашим вопросом.</div>
                            <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                    `;
					chatMessages.appendChild(supportMessage);
					chatMessages.scrollTop = chatMessages.scrollHeight;
				}, 1000);
			}
		}

		sendButton.addEventListener('click', sendMessage);

		chatInput.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				sendMessage();
			}
		});
	}
}