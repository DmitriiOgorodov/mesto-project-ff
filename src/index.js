// Темплейт карточки
import './pages/index.css'
// import {initialCards} from './scripts/cards.js'

// Импорты изображений
import logo from './images/logo.svg';
// import avatar from './images/avatar.jpg';

// Установка src для изображений
document.querySelector('.header__logo').src = logo;
// document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// Импорты функций
import { createCard } from './components/card.js';
import { openPopap, closePopap } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  loadUserInfo,
  loadCards,
  editProfile,
  addNewCard,
  updateAvatar
} from './components/api.js';

// DOM узлы
const placesList = document.querySelector('.places__list')

// Вывести карточки на страницу
// initialCards.forEach((item) => {
//   placesList.append(createCard(item, openCardImage))
// })

// Логика модальных окон
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const avatarButton = document.querySelector('.profile__avatar-button')
const editForm = document.querySelector('.popup_type_edit')
const addForm = document.querySelector('.popup_type_new-card')
const imagePopap = document.querySelector('.popup_type_image')
const avatarForm = document.querySelector('.popup_type_new-avatar')

// Анимация
const allPopups = document.querySelectorAll('.popup')
allPopups.forEach((popup) => {
  popup.classList.add('popup_is-animated')
})

// События открытия
editButton.addEventListener('click', () =>{
  nameInput.value = document.querySelector('.profile__title').textContent
  jobInput.value = document.querySelector('.profile__description').textContent
  clearValidation(editForm, config)
  openPopap(editForm)
})

addButton.addEventListener('click', () => {
  clearValidation(addForm, config)
  openPopap(addForm)
  placeInput.value = ''
  linkInput.value = ''
})

avatarButton.addEventListener('click', () => {
  openPopap(avatarForm)
  clearValidation(avatarForm, config)
})

function showCardImage(item) {
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

// Попап добавления аватара
const avatarLinkInput = avatarForm.querySelector('input[name=avatar-link]')
const avatarImage = document.querySelector('.profile__image')

  function avatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarButtonSave = avatarForm.querySelector('.popup__button');
  avatarButtonSave.textContent = 'Сохранение...';
  updateAvatar(avatarLinkInput.value)
    .then(data => {
      avatarImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch(err => console.log(err))
    .finally(() => {
      avatarButtonSave.textContent = 'Сохранить';
    });
}

avatarForm.addEventListener('submit', (evt) => {
  avatarFormSubmit(evt)
  closePopap(avatarForm)
})

// Попап редактирования профиля
// const editForm = document.querySelector('.popup_type_edit')
const nameInput = editForm.querySelector('input[name=name]')
const jobInput = editForm.querySelector('input[name=description]')

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')

function editFormSubmit(evt) {
  evt.preventDefault(); 
    
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value

  editProfile(nameInput.value, jobInput.value)
    .then((profileInfo) => {
      profileTitle.textContent = profileInfo.name
      profileDescription.textContent = profileInfo.about
      console.log(profileInfo)
    })
    .catch((err) => {
      console.log(err);
    });
}

editForm.addEventListener('submit', (evt) => {
  editFormSubmit(evt)
  closePopap(editForm)
});

// Попап добавления карточек
// const addForm = document.querySelector('.popup_type_new-card')
const placeInput = addForm.querySelector('input[name=place-name]')
const linkInput = addForm.querySelector('input[name=link]')

function addCardSubmit(evt) {
  evt.preventDefault(); 

  const initialCard = {name: placeInput.value, link: linkInput.value}

  addNewCard(initialCard.name, initialCard.link)
    .then((res) => {
      placesList.prepend(createCard(res, showCardImage))
      console.log(res)
    })
    .catch((err) => {
      console.log(err);
    });

  placeInput.value = ''
  linkInput.value = ''
}

addForm.addEventListener('submit', (evt) => {
  addCardSubmit(evt)
  closePopap(addForm)
})

// Включение валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(config);


Promise.all([loadUserInfo(), loadCards()])
  .then(([user, cards]) => {
    profileTitle.textContent = user.name
    profileDescription.textContent = user.about
    profileImage.style.backgroundImage = `url(${user.avatar})`;

    console.log(user)

    cards.forEach((card) => {
      placesList.append(createCard(card, showCardImage)); // Полученный массив карточек
    })
  })
  .catch((err) => {
    console.log(err);
  });

