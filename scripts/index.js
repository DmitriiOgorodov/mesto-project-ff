// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content
const places__list = document.querySelector('.places__list')

initialCards.forEach((item) => {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardDeleteButton = card.querySelector('.card__delete-button')

  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__title').textContent = item.name;

  places__list.append(card)

  removeCard(cardDeleteButton)
})

function removeCard (button) {
  button.addEventListener('click', (evt) => {
    evt.target.closest('.places__item').remove();
  })
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
