export const cardTemplate = document.querySelector('#card-template').content

// @todo: Функция создания карточки
export function createCard(fieldValues, open) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardDeleteButton = card.querySelector('.card__delete-button')
  const cardLikeButton = card.querySelector('.card__like-button')
  const cardImage = card.querySelector('.card__image')
  
  card.querySelector('.card__image').src = fieldValues.link;
  card.querySelector('.card__image').setAttribute('alt', fieldValues.name);
  card.querySelector('.card__title').textContent = fieldValues.name;

  cardDeleteButton.addEventListener('click', deleteCard)
  cardLikeButton.addEventListener('click', likeCard)
  open(cardImage)

  return card
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest('.places__item').remove()
}

// Лайк карточки
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}