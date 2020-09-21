import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

const db = firebase.firestore();
Vue.use(Vuex);

const GET_THEMES = (state, themes) => {
  state.themes = themes;
};

const ADD_THEME = (state, theme) => {
  state.themes.push(theme);
  db.collection('themes')
    .add(theme)
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
};

const UPDATE_THEME = (state, theme) => {
  db.collection('themes')
    .doc(theme.id)
    .update(theme);

  for (var i = state.themes.length - 1; i >= 0; i--) {
    if (state.themes[i].id === theme.id) {
      state.themes[i] = theme;
    }
  }
};

const REMOVE_THEME = (state, theme) => {
  db.collection('themes')
    .doc(theme.id)
    .delete()
    .then(function() {
      console.log('Document successfully deleted!');
      for (var i = state.themes.length - 1; i >= 0; i--) {
        if (state.themes[i].id === theme.id) {
          state.themes.splice(i, 1);
        }
      }
    })
    .catch(function(error) {
      console.error('Error removing document: ', error);
    });
};

export default {
  GET_THEMES,
  ADD_THEME,
  UPDATE_THEME,
  REMOVE_THEME
};
