import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'sign up': 'sign up',
      login: 'Login',
      logout: 'Login',
      required: 'required',
      registration: 'Registration',
      register: 'Register',
      username: 'Username',
      password: 'Password',
      'repeat-password': 'Repeat password',
      'min-6-chars': 'Minimum 6 chars',
      '3-to-20-chars': 'From 3 to 20 chars',
      channels: 'Channels',
      messages: 'messages',
      send: 'Send',
      cancel: 'Cancel',
      'hexlet-chat': 'Hexlet Chat',
      'add-channel': 'Add channel',
      'channel-name': 'Channel name',
      delete: 'Delete',
      rename: 'Rename',
      'rename-channel': 'Rename channel',
      'channel-created': 'Channel created',
      'channel-renamed': 'Channel renamed',
      'channel-deleted': 'Channel deleted',
    },
  },
  ru: {
    translation: {
      'sign up': 'зарегистрироваться',
      login: 'Войти',
      logout: 'Выйти',
      required: 'Обязательное поле',
      registration: 'Регистрация',
      register: 'Зарегистрироваться',
      username: 'Имя пользователя',
      password: 'Пароль',
      'repeat-password': 'Подтвердите пароль',
      'min-6-chars': 'Не менее 6 символов',
      '3-to-20-chars': 'От 3 до 20 символов',
      channels: 'Каналы',
      messages: 'сообщений',
      send: 'Отправить',
      cancel: 'Отменить',
      'hexlet-chat': 'Hexlet Chat',
      'add-channel': 'Добавить канал',
      'channel-name': 'Имя канала',
      delete: 'Удалить',
      rename: 'Переименовать',
      'rename-channel': 'Переименовать канал',
      'channel-created': 'Канал создан',
      'channel-renamed': 'Канал переименован',
      'channel-deleted': 'Канал удалён',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ru', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
