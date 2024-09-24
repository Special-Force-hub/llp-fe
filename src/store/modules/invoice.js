import types from '../constants/invoiceConstants';
import { fromJS, Map } from 'immutable';

const INITIAL_STATE = {
  active_notification: [],
};
const initialImmutableState = fromJS(INITIAL_STATE);

const invoiceReducer = (state = initialImmutableState, action = {}) => {
  switch (action.type) {
    case types.SET_REDIRECTURL:
      return state.withMutations((mutableState) => {
        mutableState.set('redirectURL', fromJS(action.payload));
      });
    case types.SET_INVOICE_LIST:
      return state.withMutations((mutableState) => {
        mutableState.set('invoiceData', fromJS(action.payload));
      });
    case types.SET_INVOICE_PDF:
      return state.withMutations((mutableState) => {
        mutableState.set('invoicePDF', fromJS(action.payload));
      });
    case types.SET_PDF_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set('pdf_loading', fromJS(action.payload));
      });
    case types.SET_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('error', fromJS(action.payload));
      });
    case types.SET_INVOICE_POLICY:
      return state.withMutations((mutableState) => {
        mutableState.set('application', fromJS(action.payload));
      });
    case types.SEARCH_SPINNER:
      return state.withMutations((mutableState) => {
        mutableState.set('searchSpinner', fromJS(action.payload));
      });
    default:
      return state;
  }
};

export default invoiceReducer;
