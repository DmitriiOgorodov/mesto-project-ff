// Функция открытия попапа
export function openPopap(popup) {
  popup.classList.add('popup_is-opened')
}

// Модальные окна
const allPopups = document.querySelectorAll('.popup')
allPopups.forEach((popup) => {
  popup.classList.add('popup_is-animated')
})

// Функция закрытия попапа
export function closePopap(popup) {
  popup.classList.remove('popup_is-opened')
}

// Закрытие на крестик
document.querySelectorAll('.popup__close').forEach((button) => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closePopap(popup))
})

// Закрытие на оверлей
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopap(popup)
    }
  })
})

// Закрытие на ESC
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopap(openedPopup);
        }
    }
}

document.addEventListener('keydown', closeByEscape);