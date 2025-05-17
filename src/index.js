// @todo: Темплейт карточки
import './pages/index.css'
import {initialCards} from './scripts/cards.js'

// Импорт изображений
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';

// Установка src для изображений
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

const cardTemplate = document.querySelector('#card-template').content
const placesList = document.querySelector('.places__list')

initialCards.forEach((item) => {
  createCard(item.name, item.link, deleteCard)
})

function createCard (name, link, callback) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardDeleteButton = card.querySelector('.card__delete-button')

  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').setAttribute('alt', name);
  card.querySelector('.card__title').textContent = name;

  cardDeleteButton.addEventListener('click', callback)

  placesList.append(card)
}

function deleteCard (evt) {
  evt.target.closest('.places__item').remove()
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
