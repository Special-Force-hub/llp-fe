import types from '../constants/claimformConstants';

const initialState = {
  data: {
    state: null,
    landlord: null,
    apartment: null,
    policy: null,
    depositAmount: null,
    claimAmount: null,
    vacantCheck: true,
    evictionCheck: true,
    keyCheck: true,
  },
  landlordArray: null,
  apartmentArray: null,
  policyArray: null,
  error: null,
};

const claimFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case types.SET_LANDLORD_ARRAY:
      return {
        ...state,
        landlordArray: action.payload,
      };
    case types.SET_APARTMENT_ARRAY:
      return {
        ...state,
        apartmentArray: action.payload,
      };
    case types.SET_RIDER_ARRAY:
      return {
        ...state,
        policyArray: action.payload,
      };
    case types.SET_CLAIMID:
      return {
        ...state,
        claimId: action.payload,
      };
    case types.SET_ERR:
      return {
        ...state,
        error: action.payload,
      };
    case types.SET_POLICY_DUPLICATED:
      return {
        ...state,
        policyDuplicated: action.payload,
      };
    case types.SET_CLAIM_RESULT:
      return {
        ...state,
        createResult: action.payload,
      };
    default:
      return state;
  }
};

export default claimFormReducer;
