export const isValidEmail = (email: string) => {
  return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const isValidPassword = (password: string) => {
  return password.length >= 8;
};
