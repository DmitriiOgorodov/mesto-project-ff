// @todo: Функция создания карточки
import {openPopap, closePopap} from './modal.js'

export const cardTemplate = document.querySelector('#card-template').content
export const placesList = document.querySelector('.places__list')
const imagePopap = document.querySelector('.popup_type_image')

export function createCard(name, link) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardDeleteButton = card.querySelector('.card__delete-button')
  const cardLikeButton = card.querySelector('.card__like-button')
  const cardImage = card.querySelector('.card__image')

  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').setAttribute('alt', name);
  card.querySelector('.card__title').textContent = name;

  cardDeleteButton.addEventListener('click', deleteCard)
  cardLikeButton.addEventListener('click', likeCard)
  cardImage.addEventListener('click', (evt) =>{
    openPopap(imagePopap)
    document.querySelector('.popup__image').src = evt.target.src
    document.querySelector('.popup__image').alt = evt.target.alt
    document.querySelector('.popup__caption').textContent = evt.target.alt
  })

  placesList.prepend(card)
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.places__item').remove()
}

// Лайк карточки
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

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