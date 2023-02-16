import axios from "axios";
export const GET_NOTES = "GET_NOTES";
export const ARCHIVE_NOTE = "ARCHIVE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const GET_DETAIL = "GET_DETAIL";
export const GET_CATEGORYS = "GET_CATEGORYS";
export const FILTER_BY_CATEG = "FILTER_BY_CATEG";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const SEARCHxTITLE = "SEARCHxTITLE";
export const DELETE_CATEG = "DELETE_CATEG";

export const getNotes = () => {
  return async function (dispatch) {
    const response = await axios.get("/notes");
    return dispatch({
      type: GET_NOTES,
      payload: response.data,
    });
  };
};
export function getCategorys() {
  return async function (dispatch) {
    const response = await axios.get("/categorys");
    return dispatch({
      type: GET_CATEGORYS,
      payload: response.data,
    });
  };
}

export const getDetail = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`/notes/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: response.data,
    });
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export function postNotes(payload) {
  return async function () {
    const response = await axios.post("/notes", payload);
    return response;
  };
}
export function postCategory(payload) {
  return async function () {
    const response = await axios.post("/categorys", payload);
    return response;
  };
}
export function deleteCategory(id) {
  return async function (dispatch) {
    await axios.delete(`/categorys/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return dispatch({
      type: DELETE_CATEG,
      payload: id,
    });
  };
}

export function updateNote(data, id) {
  return async function () {
    await axios.put(`/notes/${id}`, data);
  };
}

export function archiveNote(id) {
  return {
    type: ARCHIVE_NOTE,
    payload: id,
  };
}

export function deleteNote(id) {
  return async function (dispatch) {
    await axios.delete(`/notes/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return dispatch({
      type: DELETE_NOTE,
      payload: id,
    });
  };
}

export function filterByCateg(payload) {
  return {
    type: FILTER_BY_CATEG,
    payload: payload,
  };
}

export const searchXtitle = (title) => {
  console.log(title);

  return {
    type: SEARCHxTITLE,
    payload: title,
  };
};
