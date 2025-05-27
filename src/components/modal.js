// Функция открытия попапа
export function openPopap(popup) {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', closeByEscape);
}

// Функция закрытия попапа
export function closePopap(popup) {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopap(openedPopup);
    }
  }
}