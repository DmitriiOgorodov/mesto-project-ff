// @todo: Темплейт карточки
import './pages/index.css'
import {initialCards} from './scripts/cards.js'

// Импорт изображений
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';

// Установка src для изображений
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content
const placesList = document.querySelector('.places__list')

// @todo: Функция создания карточки
function createCard (name, link) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardDeleteButton = card.querySelector('.card__delete-button')

  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').setAttribute('alt', name);
  card.querySelector('.card__title').textContent = name;

  cardDeleteButton.addEventListener('click', deleteCard)

  placesList.append(card)
}

// @todo: Функция удаления карточки
function deleteCard (evt) {
  evt.target.closest('.places__item').remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  createCard(item.name, item.link, deleteCard)
})

// Логика модальных окон
// Кнопки
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')

// Модальные окна
const editProfilePopap = document.querySelector('.popup_type_edit')
const addNewCardPopap = document.querySelector('.popup_type_new-card')

// Функция открытия попапа
function openPopap(popap) {
  popap.classList.add('popup_is-opened')
}

editButton.addEventListener('click', () => openPopap(editProfilePopap))
addButton.addEventListener('click', () => openPopap(addNewCardPopap))

// Функция закрытия попапа
function closePopap(popup) {
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

// Логика редактирования карточек
// Находим форму в DOM
const formElement = document.querySelector('.popup_type_edit')// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('input[name=name]')// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('input[name=description]')// Воспользуйтесь инструментом .querySelector()

nameInput.value = document.querySelector('.profile__title').textContent
jobInput.value = document.querySelector('.profile__description').textContent
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    document.querySelector('.profile__title').textContent = nameInput.value
    document.querySelector('.profile__description').textContent = jobInput.value

    closePopap(formElement)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

console.log(jobInput.value)