import types from '../constants/claimformConstants';

export const setDataAction = (data) => ({
  type: types.SET_DATA,
  payload: data,
});

export const setLandlordArrayAction = (data) => ({
  type: types.SET_LANDLORD_ARRAY,
  payload: data,
});

export const getLandlordAction = (data) => ({
  type: types.GET_LANDLORD,
  payload: data,
});

export const setApartmentArrayAction = (data) => ({
  type: types.SET_APARTMENT_ARRAY,
  payload: data,
});

export const getApartmentAction = (data) => ({
  type: types.GET_APARTMENT,
  payload: data,
});

export const setRiderArrayAction = (data) => ({
  type: types.SET_RIDER_ARRAY,
  payload: data,
});

export const getRiderAction = (data) => ({
  type: types.GET_RIDER,
  payload: data,
});

export const setClaimIdAction = (data) => ({
  type: types.SET_CLAIMID,
  payload: data,
});

export const setAgreementIdAction = (data) => ({
  type: types.SET_AGREEMENTID,
  payload: data,
});

export const setLedgerIdAction = (data) => ({
  type: types.SET_LEDGERID,
  payload: data,
});

export const setErrorAction = (data) => ({
  type: types.SET_ERR,
  payload: data,
});

export const createClaimAction = (data) => ({
  type: types.CREAT_CLAIM,
  payload: data,
});

export const checkPolicyDuplicatedAction = (data) => ({
  type: types.CHECK_POLICY_DUPLICATED,
  payload: data,
});

export const setPolicyDuplicatedAction = (data) => ({
  type: types.SET_POLICY_DUPLICATED,
  payload: data,
});

export const setResultAction = (data) => ({
  type: types.SET_CLAIM_RESULT,
  payload: data,
});
