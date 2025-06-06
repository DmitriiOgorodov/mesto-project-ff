import { addLike, deleteCardFromServer, deleteLike } from "./api"

export const cardTemplate = document.querySelector('#card-template').content

// @todo: Функция создания карточки
export function createCard(fieldValues, openCardImage) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardDeleteButton = card.querySelector('.card__delete-button')
  const cardLikeButton = card.querySelector('.card__like-button')
  const cardImage = card.querySelector('.card__image')
  
  card.querySelector('.card__image').src = fieldValues.link;
  card.querySelector('.card__image').setAttribute('alt', fieldValues.name);
  card.querySelector('.card__title').textContent = fieldValues.name;

  cardDeleteButton.addEventListener('click', evt => {
    deleteCard(evt, fieldValues['_id'])
  })

  openCardImage(cardImage)

  if (fieldValues.likes.some((element) => element['_id'] === 'e30dbc642a6775f59f890fce')){
    cardLikeButton.classList.add('card__like-button_is-active')
    cardLikeButton.addEventListener('click', (evt) => {
      likeCard(evt)
      deleteLike(fieldValues['_id'])
    })
  } else {
    cardLikeButton.classList.remove('card__like-button_is-active')
    cardLikeButton.addEventListener('click', (evt) => {
      likeCard(evt)
      addLike(fieldValues['_id'])
    })
  }

  return card
}

// @todo: Функция удаления карточки
export function deleteCard(evt, id) {
  evt.target.closest('.places__item').remove()
  deleteCardFromServer(id)
    .catch(err => console.log(err))
}

// Лайк карточки
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}
