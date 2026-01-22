import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Contact } from '@/modules/contact/contact.type';

interface ContactState {
  contacts: {
    [email: string]: Contact;
  };
}

const initialState: ContactState = {
  contacts: {
    'ivanov.ivan@mail.ru': {
      email: 'ivanov.ivan@mail.ru',
      name: 'Иванов Иван Сергеевич',
    },
    'petrova.elena@mail.ru': {
      email: 'petrova.elena@mail.ru',
      name: 'Петрова Елена Викторовна',
    },
    'smirnov.alexey@mail.ru': {
      email: 'smirnov.alexey@mail.ru',
      name: 'Смирнов Алексей Дмитриевич',
    },
    'sidorov.pavel@mail.ru': {
      email: 'sidorov.pavel@mail.ru',
      name: 'Сидоров Павел Алексеевич',
    },
    'fedorova.anna@mail.ru': {
      email: 'fedorova.anna@mail.ru',
      name: 'Фёдорова Анна Михайловна',
    },
    'kozlov.dmitry@mail.ru': {
      email: 'kozlov.dmitry@mail.ru',
      name: 'Козлов Дмитрий Сергеевич',
    },
    'popova.olga@mail.ru': {
      email: 'popova.olga@mail.ru',
      name: 'Попова Ольга Васильевна',
    },
    'egorov.nikolay@mail.ru': {
      email: 'egorov.nikolay@mail.ru',
      name: 'Егоров Николай Павлович',
    },
    'vmitsykson@itmo.ru': {
      email: 'vmitsykson@itmo.ru',
      name: 'Ицыксон Владимир Михайлович',
    },
    'averoshkin@itmo.ru': {
      email: 'averoshkin@itmo.ru',
      name: 'Ерошкин Александр Владимирович',
    },
    'morozova.tatyana@mail.ru': {
      email: 'morozova.tatyana@mail.ru',
      name: 'Морозова Татьяна Андреевна',
    },
    'volkov.sergey@mail.ru': {
      email: 'volkov.sergey@mail.ru',
      name: 'Волков Сергей Владимирович',
    },
  },
};

interface UpdateContatsPayload {
  contacts: {
    [email: string]: Contact;
  };
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    updateContats: (state, action: PayloadAction<UpdateContatsPayload>) => {
      const { contacts } = action.payload;
      state.contacts = { ...state.contacts, ...contacts };
    },
  },
});

export const { updateContats } = contactSlice.actions;
export const { reducer: contactReducer } = contactSlice;
