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
function createCard(name, link) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardDeleteButton = card.querySelector('.card__delete-button')
  const cardLikeButton = card.querySelector('.card__like-button')

  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').setAttribute('alt', name);
  card.querySelector('.card__title').textContent = name;

  cardDeleteButton.addEventListener('click', deleteCard)
  cardLikeButton.addEventListener('click', likeCard)

  placesList.append(card)
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.places__item').remove()
}

// Лайк карточки
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  createCard(item.name, item.link)
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

// Логика редактирования профиля
const editForm = document.querySelector('.popup_type_edit')

const nameInput = editForm.querySelector('input[name=name]')
const jobInput = editForm.querySelector('input[name=description]')

nameInput.value = document.querySelector('.profile__title').textContent
jobInput.value = document.querySelector('.profile__description').textContent

function editFormSubmit(evt) {
    evt.preventDefault(); 
    
    document.querySelector('.profile__title').textContent = nameInput.value
    document.querySelector('.profile__description').textContent = jobInput.value

    closePopap(editForm)
}

editForm.addEventListener('submit', editFormSubmit);

// Логика добавления карточек
const addForm = document.querySelector('.popup_type_new-card')

const placeInput = addForm.querySelector('input[name=place-name]')
const linkInput = addForm.querySelector('input[name=link]')

function addCardSubmit(evt) {
    evt.preventDefault(); 
    
    createCard(placeInput.value, linkInput.value)

    placeInput.value = ''
    linkInput.value = ''

    closePopap(addForm)
}

addForm.addEventListener('submit', addCardSubmit);

// console.log(linkInput)



console.log(evt.target.classList.toggle('.card__like-button_is-active'))
// createCard('name', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', deleteCard)