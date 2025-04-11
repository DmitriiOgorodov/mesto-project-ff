// @todo: Темплейт карточки
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
