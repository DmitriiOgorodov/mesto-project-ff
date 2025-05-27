// @todo: Темплейт карточки
import './pages/index.css'
import {initialCards} from './scripts/cards.js'

// Импорт изображений
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';

// Установка src для изображений
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// Импорты функций
import { createCard } from './components/card.js';
import { openPopap, closePopap } from './components/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list')

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item, openCardImage))
})

// Логика модальных окон
// Кнопки
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
// const cardImages = document.querySelectorAll('.card__image')

// Модальные окна
const editProfilePopap = document.querySelector('.popup_type_edit')
const newCardPopap = document.querySelector('.popup_type_new-card')
const imagePopap = document.querySelector('.popup_type_image')

// Анимация
const allPopups = document.querySelectorAll('.popup')
allPopups.forEach((popup) => {
  popup.classList.add('popup_is-animated')
})

// События открытия
editButton.addEventListener('click', () =>{
  nameInput.value = document.querySelector('.profile__title').textContent
  jobInput.value = document.querySelector('.profile__description').textContent
  openPopap(editProfilePopap)
})

addButton.addEventListener('click', () => {
  openPopap(newCardPopap)
})

function openCardImage(item) {
  item.addEventListener('click', (evt) =>{
    openPopap(imagePopap)
    document.querySelector('.popup__image').src = evt.target.src
    document.querySelector('.popup__image').alt = evt.target.alt
    document.querySelector('.popup__caption').textContent = evt.target.alt
  })
}

// События закрытия
document.querySelectorAll('.popup__close').forEach((button) => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closePopap(popup))
})

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopap(popup)
    }
  })
})

// Логика редактирования профиля
const editForm = document.querySelector('.popup_type_edit')

const nameInput = editForm.querySelector('input[name=name]')
const jobInput = editForm.querySelector('input[name=description]')

function editFormSubmit(evt) {
    evt.preventDefault(); 
    
    document.querySelector('.profile__title').textContent = nameInput.value
    document.querySelector('.profile__description').textContent = jobInput.value
}

editForm.addEventListener('submit', (evt) => {
  editFormSubmit(evt)
  closePopap(editForm)
});

// Попап добавления карточек
const addForm = document.querySelector('.popup_type_new-card')

const placeInput = addForm.querySelector('input[name=place-name]')
const linkInput = addForm.querySelector('input[name=link]')

function addCardSubmit(evt) {
  evt.preventDefault(); 

  const initialCard = {name: placeInput.value, link: linkInput.value}
  
  placesList.prepend(createCard(initialCard, openCardImage))

  placeInput.value = ''
  linkInput.value = ''
}

addForm.addEventListener('submit', (evt) => {
  addCardSubmit(evt)
  closePopap(addForm)
})

