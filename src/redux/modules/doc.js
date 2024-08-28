import types from '../constants/documentConstants';

const initialState = {
  active_notification: [],
};

const docReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DOCTITLE:
      return {
        ...state,
        title: action.payload,
      };
    case types.SET_DOCFILE:
      return {
        ...state,
        file: action.payload,
      };
    case types.SET_ACTIVE_NOTIFICATION:
      return {
        ...state,
        active_notification: action.payload,
      };
    case types.SET_DOC_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default docReducer;
