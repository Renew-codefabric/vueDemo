import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import axios from "axios";

import { SAVE_THEME } from "@/store/constants";

const db = firebase.firestore();
Vue.use(Vuex);

const GET_THEMES = (state, themes) => {
  state.themes = themes;
};

const ADD_THEME = async (state, theme) => {
  await axios
    .post(SAVE_THEME, theme)
    .then((response) => console.log("INFO", response));

  const exist = state.themes.filter(
    (currentTheme) => currentTheme.title == theme.title
  );

  if (exist.length <= 0) {
    state.themes.push(theme);

    db.collection("themes")
      .add(theme)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }
};

const UPDATE_THEME = (state, theme) => {
  db.collection("themes")
    .doc(theme.id)
    .update(theme);

  state.themes.map((currentTheme) => {
    if (currentTheme.id === theme.id) {
      currentTheme = theme;
    }
  });
};

const REMOVE_THEME = (state, theme) => {
  db.collection("themes")
    .doc(theme.id)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
      state.themes = state.themes.filter(
        (currentTheme) => currentTheme.id != theme.id
      );
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
};

export default {
  GET_THEMES,
  ADD_THEME,
  UPDATE_THEME,
  REMOVE_THEME,
};
