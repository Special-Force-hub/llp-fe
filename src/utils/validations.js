export const validatePassword = (password) => {
  if (password.length < 8) return false;

  let containsNumber = false;
  let containsSpecialCharacter = false;

  for (let i = 0; i < password.length; i++) {
    if (password[i] >= '0' && password[i] <= '9') {
      containsNumber = true;
    }

    if (
      (password[i] < '0' || password[i] > '9') &&
      (password[i] < 'a' || password[i] > 'z') &&
      (password[i] < 'A' || password[i] > 'Z')
    ) {
      containsSpecialCharacter = true;
    }
  }

  return containsNumber && containsSpecialCharacter;
};
