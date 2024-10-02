// Global UI Action
export const OPEN_MENU = 'OPEN_MENU';

export const openMenu = (menuItem) => ({
  type: OPEN_MENU,
  data: menuItem,
});
