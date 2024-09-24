import types from '../constants/invoiceConstants';

export const getQBOAuthAction = () => ({
  type: types.GET_QBOAUTH,
});

export const setRedirectURLAction = (data) => ({
  type: types.SET_REDIRECTURL,
  payload: data,
});

export const getInvoiceListAction = (data) => ({
  type: types.GET_INVOICE_LIST,
  payload: data,
});

export const setErrorAction = (data) => ({
  type: types.SET_ERROR,
  payload: data,
});

export const setInvoiceListAction = (data) => ({
  type: types.SET_INVOICE_LIST,
  payload: data,
});

export const getInvoicePDFAction = (data) => ({
  type: types.GET_INVOICE_PDF,
  payload: data,
});

export const setPDFLoadingAction = (data) => ({
  type: types.SET_PDF_LOADING,
  payload: data,
});

export const setInvoicePDFAction = (data) => ({
  type: types.SET_INVOICE_PDF,
  payload: data,
});

export const sendDisputeToAdminAction = (data) => ({
  type: types.SEND_DISPUTE,
  payload: data,
});

export const fetchPolicyAction = (data) => ({
  type: types.FETCH_INVOICE_POLICY,
  payload: data,
});

export const setPolicyAction = (data) => ({
  type: types.SET_INVOICE_POLICY,
  payload: data,
});

export const invoiceNumberSearchAction = (data) => ({
  type: types.SEARCH_INVOICE_NUMBER,
  payload: data,
});

export const searchSpinnerAction = (data) => ({
  type: types.SEARCH_SPINNER,
  payload: data,
});
