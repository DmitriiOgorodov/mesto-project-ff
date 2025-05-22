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

// Работа модальных окон
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


// document.querySelector('.popup__close').addEventListener('click', closePopap)

editButton.addEventListener('click', () => openPopap(editProfilePopap))
addButton.addEventListener('click', () => openPopap(addNewCardPopap))

// console.log(document.querySelectorAll('.popup__close'))

