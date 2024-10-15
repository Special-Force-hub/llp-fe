import * as types from '../constants/uiConstants';

export const openMenuItem = (menu) => ({
  type: types.OPEN_MENU,
  payload: menu,
});

export const openDetails = (details) => ({
  type: types.OPEN_DETAILS,
  payload: details,
});
