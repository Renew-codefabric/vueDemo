import { types } from "./state";
import firebase from "firebase";

const getThemesList = async ({ commit }) => {
  const snapshot = await firebase
    .firestore()
    .collection("themes")
    .get();

  const promiseThemes = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  commit(types.GET_THEMES, promiseThemes);
};

const addTheme = ({ commit }, { name, lastName, email }) => {
  commit(types.ADD_THEME, {
    name,
    lastName,
    email
  });
};

const removeTheme = ({ commit }, { id, name, lastName, email }) => {
  commit(types.REMOVE_THEME, {
    id,
    name, lastName, email
  });
};

const editTheme = ({ commit }, { id, name, lastName, email }) => {
  commit(types.UPDATE_THEME, {
    id,
    name, lastName, email
  });
};

export default {
  getThemesList,
  addTheme,
  removeTheme,
  editTheme
};
