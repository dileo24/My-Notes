import {
  GET_NOTES,
  DELETE_NOTE,
  ARCHIVE_NOTE,
  GET_DETAIL,
  GET_CATEGORYS,
  FILTER_BY_CATEG,
} from "./actions";

const initialState = {
  notes: [],
  detail: [],
  categorys: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES: {
      return {
        ...state,
        notes: action.payload,
        copyNotes: action.payload,
      };
    }
    case GET_CATEGORYS: {
      return {
        ...state,
        categorys: action.payload,
      };
    }

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case DELETE_NOTE: {
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    }
    case ARCHIVE_NOTE: {
      let newArchive = state.notes.find((note) => note.id === action.payload);
      return {
        ...state,
        notes: [
          ...state.notes.map((note) =>
            note.id === newArchive.id ? newArchive : note
          ),
        ],
      };
    }
    case FILTER_BY_CATEG:
      const noteCateg =
        action.payload === "all"
          ? state.copyNotes
          : state.copyNotes.filter((elem) =>
              elem.category?.includes(action.payload)
            );
      return {
        ...state,
        notes: noteCateg,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
