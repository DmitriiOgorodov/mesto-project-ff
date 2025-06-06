import { addLike, deleteCardFromServer, deleteLike } from "./api"

export const cardTemplate = document.querySelector('#card-template').content

// @todo: Функция создания карточки
export function createCard(cardData, handleCardClick, user) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardDeleteButton = card.querySelector('.card__delete-button')
  const cardLikeButton = card.querySelector('.card__like-button')
  const cardImage = card.querySelector('.card__image')
  const likeCounter = card.querySelector('.card__like-counter');
  
  card.querySelector('.card__image').src = cardData.link;
  card.querySelector('.card__image').setAttribute('alt', cardData.name);
  card.querySelector('.card__title').textContent = cardData.name;

  cardImage.addEventListener('click', handleCardClick);

  likeCounter.textContent = cardData.likes.length
  
  if (cardData.owner._id === user._id) {
    cardDeleteButton.addEventListener('click', evt => {
    deleteCard(evt, cardData._id)
  });
  } else {
    cardDeleteButton.classList.add('card__delete-button_hidden');
  }

  cardLikeButton.addEventListener('click', evt => {
    if (cardData.likes.some((element) => element['_id'] === user['_id'])) {
      deleteLike(cardData['_id'])
      .then(res => {
          cardData.likes = res.likes;
          likeCounter.textContent = res.likes.length;
        })
    } else {
      addLike(cardData['_id'])
      .then(res => {
          cardData.likes = res.likes;
          likeCounter.textContent = res.likes.length;
        })
    }
    likeCard(evt)
  })

  // showCardImage(cardImage)
  checkLike(cardData, user, cardLikeButton)

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

// Проверка лайка
function checkLike(cardData, userData, button) {
  if (cardData.likes.some((element) => element['_id'] === userData['_id'])){
    button.classList.add('card__like-button_is-active')
    } else {
    button.classList.remove('card__like-button_is-active')
  }
}