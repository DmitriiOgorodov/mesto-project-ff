// @todo: Темплейт карточки
import './pages/index.css'
import {initialCards} from './scripts/cards.js'

// Импорт логики для работы с карточками
import {createCard} from './components/card.js';

// Импорт логики для работы с модальными окнами
import {openPopap} from './components/modal.js';

// Импорт изображений
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';

// Установка src для изображений
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

initialCards.reverse().forEach((item) => {
  createCard(item.name, item.link)
})

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')

const editProfilePopap = document.querySelector('.popup_type_edit')
const addNewCardPopap = document.querySelector('.popup_type_new-card')

editButton.addEventListener('click', () => openPopap(editProfilePopap))
addButton.addEventListener('click', () => openPopap(addNewCardPopap))